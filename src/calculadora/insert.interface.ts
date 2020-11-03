import { ApiProperty } from '@nestjs/swagger';

export class InsertCalculadora {
  @ApiProperty()
  expressao?: string;
}
