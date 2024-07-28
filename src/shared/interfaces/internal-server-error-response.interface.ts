import {ApiProperty} from '@nestjs/swagger';

export class InternalServerErrorResponse {
  @ApiProperty()
  public errors: unknown;
}
