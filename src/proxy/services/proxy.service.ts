import {Injectable} from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ProxyService {
  constructor() {}

  public async getAndModify(url: string): Promise<string> {
    const globalPrefix = process.env.API_PREFIX ? +'/' + process.env.API_PREFIX : '';

    const dataUrl = `https://${process.env.DOMAIN}${url.replace(`${globalPrefix}/proxy`, '')}`;

    const response = await axios.get(dataUrl);
    const $ = cheerio.load(response.data);

    const proxyPath = `${globalPrefix}/proxy`;

    this.updateElementAttributes($, 'a', 'href', proxyPath);
    this.updateElementAttributes($, 'script', 'src', proxyPath);
    this.updateElementAttributes($, 'iframe', 'src', proxyPath);
    this.updateElementAttributes($, 'img', 'src', proxyPath);
    this.updateElementAttributes($, 'link', 'href', proxyPath);

    $('body')
      .contents()
      .each((_, element) => {
        this.processTextNodes(element as cheerio.Element, $);
      });

    return $.html();
  }

  private updateElementAttributes($: cheerio.CheerioAPI, elementTag: string, attribute: string, proxyPath: string) {
    $(elementTag).each((_, element) => {
      const attrValue = $(element).attr(attribute);
      if (!attrValue) return;

      if (attrValue.startsWith('https://')) {
        return;
      } else if (
        attrValue.endsWith('.css') ||
        attrValue.endsWith('.png') ||
        attrValue.endsWith('.js') ||
        attrValue.endsWith('.json') ||
        attrValue.endsWith('.ico') ||
        attrValue.endsWith('.svg') ||
        attrValue.endsWith('.xml')
      ) {
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
