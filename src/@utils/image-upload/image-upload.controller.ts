import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ENV } from '../../env';
import { commonResponse } from '../outputResponse.utils';
import { storageOptions } from '../util.function';

@Controller('upload')
@ApiTags('Upload')
export class ImageUploadController {
  private imageBasePublicPath = ENV.BASE_UPLOAD_URL;

  constructor() {}

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions }))
  uploadFile(@UploadedFile() file) {
    const data = {
      link: `${this.imageBasePublicPath}${file.filename}`,
    };
    return commonResponse(true, 'Image Upload Success', data);
  }
}
