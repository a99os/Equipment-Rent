import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEquipmentDto } from './dto/create-equipment.to';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createEquipmentDto: CreateEquipmentDto,
    @UploadedFile() image,
  ) {
    return this.equipmentService.create(createEquipmentDto, image);
  }
}
