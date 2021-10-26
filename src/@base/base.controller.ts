import { Filter } from './dto/filter.dto';
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

export abstract class BaseController<CreateDto, UpdateDto, BulkUpdateDto> {
  modelService: any;
  modelRelations: any;

  constructor(private _service: any, private _relation) {
    this.modelService = _service;
    this.modelRelations = _relation;
  }

  @Post()
  create(@Body() payload: CreateDto): Promise<any> {
    return this.modelService._create(payload, this.modelRelations);
  }

  @Post('bulkCreate')
  bulkCreate(@Body() payload: CreateDto[]): Promise<any> {
    return this.modelService._bulkCreate(payload, this.modelRelations);
  }

  @Patch('bulkUpdate')
  bulkUpdate(@Body() payload: BulkUpdateDto): Promise<any> {
    return this.modelService._bulkUpload(payload, this.modelRelations);
  }

  @Delete('bulkDelete')
  bulkDelete(@Body() payload: string[]): Promise<any> {
    return this.modelService._bulkDelete(payload, this.modelRelations);
  }

  @Get()
  filter(@Query() query: Filter): Promise<any> {
    return this.modelService._filter(query, this.modelRelations);
  }

  @Get(':id')
  getById(@Param() id: string): Promise<any> {
    return this.modelService._getById(id, this.modelRelations);
  }

  @Patch(':id')
  update(@Param() id: string, @Body() payload: UpdateDto): Promise<any> {
    return this.modelService._update(id, payload, this.modelRelations);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.modelService._remove(id);
  }
}
