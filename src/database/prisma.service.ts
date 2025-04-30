import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect(); // ⏳ เชื่อมต่อ DB เมื่อโมดูลเริ่มต้น
  }

  async onModuleDestroy() {
    await this.$disconnect(); // 🧹 ปิดการเชื่อมต่อเมื่อโมดูลถูกทำลาย
  }
}
