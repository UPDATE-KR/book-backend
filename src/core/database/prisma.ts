import { PrismaClient, PrismaClientOptions, QueryEvent } from '@prisma/client';
import {
  Injectable,
  OnApplicationShutdown,
  OnApplicationBootstrap,
  Logger,
} from '@nestjs/common';

@Injectable()
export class Prisma
  extends PrismaClient<PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'>
  implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger: Logger;
  constructor() {
    super({
      errorFormat: 'pretty',
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });

    this.logger = new Logger('prisma', false);

    this.on('query', e => {
      this.logger.log(e.query);
    });

    this.on('info', e => {
      this.logger.verbose(e.message);
    });

    this.on('warn', e => {
      this.logger.warn(e.message);
    });

    this.on('error', e => {
      this.logger.error(e.message);
    });
  }

  onApplicationBootstrap(): void {
    this.connect();
  }

  onApplicationShutdown(): void {
    this.disconnect();
  }
}

export default Prisma;
