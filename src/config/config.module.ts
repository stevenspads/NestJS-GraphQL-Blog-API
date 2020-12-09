import { ConfigService } from './config.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [
    ConfigService,
  ],
  exports: [
    ConfigService,
  ],
})
export class ConfigModule {}
