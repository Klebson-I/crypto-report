import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateTransformPipe implements PipeTransform {
  transform(value: any) {
    try {
      const date = new Date(value);
      if (Number.isNaN(date.getDate())) {
        throw new BadRequestException(
          'Invalid date format, must be year-month-day',
        );
      }
      return date;
    } catch (e) {
      throw new BadRequestException(
        'Invalid date format, must be year-month-day',
      );
    }
  }
}
