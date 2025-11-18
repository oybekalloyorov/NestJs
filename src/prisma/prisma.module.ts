import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule], // <-- bu qo‘shildi
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

