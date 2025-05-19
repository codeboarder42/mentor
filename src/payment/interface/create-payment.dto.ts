import { IsNumber, IsPositive } from 'class-validator';

export class createPaymentDto {
  @IsNumber()
  @IsPositive()
  announceId: number;

  @IsNumber()
  @IsPositive()
  hours: number;
}
