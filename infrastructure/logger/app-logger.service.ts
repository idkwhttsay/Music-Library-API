import { Logger } from '@nestjs/common';

export class AppLoggerService extends Logger {
  private readonly _context: string;

  constructor(context: string) {
    super();
    this._context = context;
  }

  log(message: unknown) {
    super.log(`[${this._context || 'App'}] ${message}`);
  }

  error(message: unknown, trace?: string) {
    super.error(`[${this._context || 'App'}] ERROR: ${message}`);
    if (trace) {
      super.error(trace);
    }
  }

  warn(message: unknown) {
    super.warn(`[${this._context || 'App'}] WARN: ${message}`);
  }

  debug(message: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(`[${this._context || 'App'}] DEBUG: ${message}`);
    }
  }

  verbose(message: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      super.log(`[${this._context || 'App'}] VERBOSE: ${message}`);
    }
  }
}
