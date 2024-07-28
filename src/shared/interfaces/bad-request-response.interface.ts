import {Constraint} from './constraint.interface';
import {InternalServerErrorResponse} from './internal-server-error-response.interface';
import {ApiProperty} from '@nestjs/swagger';

export class BadRequestResponse extends InternalServerErrorResponse {
  @ApiProperty({type: [Constraint]})
  public constraints?: Constraint[];
}
