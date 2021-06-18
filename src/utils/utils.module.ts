import { ImageUploadController } from './image-upload/image-upload.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ImageUploadController],
})
export class UtilsModule {}
