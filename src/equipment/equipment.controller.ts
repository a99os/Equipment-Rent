import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEquipmentDto } from './dto/create-equipment.to';
import { Equipment } from './equipment.model';
import { EquipmentService } from './equipment.service';
@ApiTags('Uskunalar')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
  @ApiOperation({ summary: 'Uskuna qo`shish' })
  @ApiResponse({ status: 200, type: Equipment })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createEquipmentDto: CreateEquipmentDto,
    @UploadedFile() image,
  ) {
    return this.equipmentService.create(createEquipmentDto, image);
  }
}
