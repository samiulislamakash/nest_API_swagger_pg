import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'samisql',
      database: 'SchoolManagement',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    UserModule,
  ],
})
export class AppModule {}
