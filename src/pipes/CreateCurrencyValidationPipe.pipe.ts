import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CurrencyArrayValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!Array.isArray(value)) {
      throw new BadRequestException(
        'Invalid currency data format. Must be an array of arrays.',
      );
    }

    const isSomeDataInvalid = value.some(
      (currency) =>
        typeof currency?.currency !== 'string' ||
        typeof currency?.priceCurrency !== 'string',
    );

    if (isSomeDataInvalid) {
      throw new BadRequestException(
        'Invalid currency data format. Must be an array of arrays containing strings.',
      );
    }

    return value;
  }
}
