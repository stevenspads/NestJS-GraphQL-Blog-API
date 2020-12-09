import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './../config/config.module';
import { ConfigService } from './../config/config.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.config.mongoUrl,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    ConfigService,
  ],
  exports: [],

})
export class DatabaseModule { }
