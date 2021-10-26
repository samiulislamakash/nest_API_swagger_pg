import { ormConfig } from './env';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './@modules/user/user.module';
import { UtilsModule } from './@utils/utils.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from './@modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: ormConfig.type,
      host: ormConfig.host,
      port: ormConfig.port,
      username: ormConfig.username,
      password: ormConfig.password,
      database: ormConfig.database,
      autoLoadEntities: ormConfig.autoLoadEntities,
      synchronize: ormConfig.synchronize,
      logging: ormConfig.logging,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api/v1/*'],
    }),
    UserModule,
    UtilsModule,
    ProductModule,
  ],
})
export class AppModule {}
