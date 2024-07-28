import {Injectable} from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {EFileType} from 'src/shared/enums/file-type.enum';

@Injectable()
export class ProxyService {
  constructor() {}

  public async getAndModify(url: string): Promise<string> {
    const globalPrefix = process.env.API_PREFIX ? '/' + process.env.API_PREFIX : '';

    const dataUrl = `https://${process.env.DOMAIN}${url.replace(`${globalPrefix}/proxy`, '')}`;

    const response = await axios.get(dataUrl);
    const $ = cheerio.load(response.data);

    const proxyPath = `${globalPrefix}/proxy`;

    const elementsToUpdate = [
      {tag: 'a', attribute: 'href'},
      {tag: 'script', attribute: 'src'},
      {tag: 'iframe', attribute: 'src'},
      {tag: 'img', attribute: 'src'},
      {tag: 'link', attribute: 'href'},
    ];

    elementsToUpdate.forEach(({tag, attribute}) => {
      this.updateElementAttributes($, tag, attribute, proxyPath);
    });

    $('body')
      .contents()
      .each((_, element) => {
        this.processTextNodes(element as cheerio.Element, $);
      });

    return $.html();
  }

  private shouldProxy(attrValue: string): boolean {
    return Object.values(EFileType).some((fileType) => attrValue.endsWith(fileType));
  }

  private updateElementAttributes($: cheerio.CheerioAPI, elementTag: string, attribute: string, proxyPath: string) {
    $(elementTag).each((_, element) => {
      const attrValue = $(element).attr(attribute);
      if (!attrValue) return;

      if (attrValue.startsWith('https://')) {
        return;
      } else if (this.shouldProxy(attrValue)) {
        const startsWith = attrValue.startsWith('/') ? '' : '/';
        $(element).attr(attribute, `https://${process.env.DOMAIN}${startsWith}${attrValue}`);
      } else if (attrValue.startsWith('/')) {
        $(element).attr(attribute, `${proxyPath}${attrValue}`);
      }
    });
  }

  private addTrademarkToText(text: string): string {
    return text.replace(/\b(\w{6})\b/g, '$1™');
  }

  private processTextNodes(node, $: cheerio.CheerioAPI) {
    if (node.type === 'text') {
      const text = node.data;
      const newText = this.addTrademarkToText(text);
      $(node).replaceWith(newText);
    } else if (node.type === 'tag') {
      $(node)
        .contents()
        .each((_, child) => this.processTextNodes(child as cheerio.Element, $));
    }
  }
}
