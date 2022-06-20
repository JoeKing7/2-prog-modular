import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const VAL = parseInt(value, 10);
    if (isNaN(VAL)) {
      throw new BadRequestException(`${value} is not an number`);
    }
    return VAL;
  }
}
