import { IsDateString, IsNumber, IsPositive } from 'class-validator';

export class createPaymentDto {
  @IsNumber()
  @IsPositive()
  announceId: number;

  @IsNumber()
  @IsPositive()
  hours: number;

  @IsDateString()
  date: Date;
}
