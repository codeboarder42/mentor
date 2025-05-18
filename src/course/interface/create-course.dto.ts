import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsPositive } from 'class-validator';

export class CreateCourseDto {
  @IsNumber()
  @IsPositive()
  announceId: number;

  @Transform(({ value }) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return date;
  })
  @IsDate()
  date: Date;

  @IsNumber()
  @IsPositive()
  hours: number;
}
