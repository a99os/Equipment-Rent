import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { CreateEquipmentDto } from './dto/create-equipment.to';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './equipment.model';
import { EquipmentService } from './equipment.service';
@ApiTags('Uskunalar')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
  @ApiOperation({ summary: 'Uskuna qo`shish' })
  @ApiResponse({ status: 200, type: Equipment })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createEquipmentDto: CreateEquipmentDto,
    @UploadedFile() image,
  ) {
    return this.equipmentService.create(createEquipmentDto, image);
  }

  @ApiOperation({ summary: 'Uskunalarni olish' })
  @ApiResponse({ status: 200, type: Equipment })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.equipmentService.getEquepments();
  }

  @ApiOperation({ summary: 'Uskunani yangilash' })
  @ApiResponse({ status: 200, type: Equipment })
  // @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Body() updateEquipmentDto: UpdateEquipmentDto,
    @UploadedFile() image,
    @Param() id: object,
  ) {
    return this.equipmentService.update(updateEquipmentDto, image, id['id']);
  }
}
