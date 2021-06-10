import { ormConfig } from './env';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

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
    UserModule,
  ],
})
export class AppModule {}
