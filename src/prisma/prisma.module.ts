// import { Global, Module } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Global()
// @Module({
//   providers: [
//     {
//       provide: PrismaClient,
//       useValue: new PrismaClient(),
//     },
//   ],
//   exports: [PrismaClient],
// })
// export class PrismaModule {}





import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule extends PrismaClient {
    constructor() {
        super({
          datasources: {
            db: {
              url: 'postgresql://postgres:123@127.0.0.1:5434/nest?schema=public',
            },
          },
        });
    }
}
