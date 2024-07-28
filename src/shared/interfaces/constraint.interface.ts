import {ApiProperty} from '@nestjs/swagger';

export class Constraint {
  @ApiProperty()
  public property: string;

  @ApiProperty()
  public errors: string[];
}
