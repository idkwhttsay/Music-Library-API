import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config();

export class AppLoggerService extends Logger {
  private readonly logFilePath: string;
  private readonly maxFileSizeKB: number;
  private readonly logLevel: string;

  private readonly levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  };

  constructor() {
    super();
    this.logFilePath = path.join(__dirname, process.env.LOG_FILE_PATH);
    this.maxFileSizeKB = parseInt(process.env.LOG_FILE_MAX_SIZE || '1024', 10);
    this.logLevel = process.env.LOG_LEVEL;
  }

  private shouldLog(level: string): boolean {
    return this.levels[level] <= this.levels[this.logLevel];
  }

  private writeLog(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;

    this.rotateLogFileIfNeeded();

    fs.appendFileSync(this.logFilePath, formattedMessage, 'utf8');
  }

  private rotateLogFileIfNeeded() {
    if (fs.existsSync(this.logFilePath)) {
      const stats = fs.statSync(this.logFilePath);
      const fileSizeKB = stats.size / 1024;
      if (fileSizeKB >= this.maxFileSizeKB) {
        const rotatedFilePath = `${this.logFilePath}.${Date.now()}`;
        fs.renameSync(this.logFilePath, rotatedFilePath);
      }
    }
  }

  log(message: string) {
    super.log(message);
    if (this.shouldLog('info')) {
      this.writeLog('info', message);
    }
  }

  error(message: string, trace?: string) {
    super.error(message);
    if (this.shouldLog('error')) {
      this.writeLog('error', `${message} ${trace ? `Trace: ${trace}` : ''}`);
    }
  }

  warn(message: string) {
    super.warn(message);
    if (this.shouldLog('warn')) {
      this.writeLog('warn', message);
    }
  }

  debug(message: string) {
    super.debug(message);
    if (this.shouldLog('debug')) {
      this.writeLog('debug', message);
    }
  }
}
