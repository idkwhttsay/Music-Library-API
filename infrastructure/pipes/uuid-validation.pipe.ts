import { ParseUUIDPipe } from '@nestjs/common';

export default class UUIDPipe extends ParseUUIDPipe {
  constructor() {
    super({ version: '4' });
  }
}
