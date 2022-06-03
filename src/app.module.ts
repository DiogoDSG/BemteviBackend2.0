import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/.development.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/bemtevi'),
    UserModule,
  ],
})
export class AppModule {}
