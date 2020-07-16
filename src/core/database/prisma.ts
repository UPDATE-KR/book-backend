import { PrismaClient } from "@prisma/client";
import { Injectable, OnApplicationShutdown, OnApplicationBootstrap } from "@nestjs/common";
@Injectable()
export class Prisma extends PrismaClient implements OnApplicationBootstrap, OnApplicationShutdown {

    onApplicationBootstrap(): void {
        this.connect();
    }

    onApplicationShutdown(): void {
        this.disconnect();
    }

}

export default Prisma;