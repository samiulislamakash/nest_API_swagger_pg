import { ormConfig } from './env';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './@modules/user/user.module';
import { UtilsModule } from './@utils/utils.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DepartmentModule } from './@modules/department/department.module';
import { BrandModule } from './@modules/brand/brand.module';
import { CategoryModule } from './@modules/category/category.module';
import { SubCategoryModule } from './@modules/sub-category/sub-category.module';

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
    DepartmentModule,
    BrandModule,
    CategoryModule,
    SubCategoryModule,
  ],
})
export class AppModule {}
