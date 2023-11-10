import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CryptoParamValidationPipe implements PipeTransform {
  transform(value: any) {
    try {
      const isMatch = String(value).match(/([-]?\w+)+/i);
      if (!isMatch || isMatch.input !== isMatch[0]) {
        throw new BadRequestException(
          'Currencies in param should be separated by "-"',
        );
      }

      return value.split('-');
    } catch (e) {
      throw new BadRequestException(
        'Currencies in param should be separated by "-"',
      );
    }
  }
}
