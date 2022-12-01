import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateEquipmentDto } from './dto/create-equipment.to';
import { Equipment } from './equipment.model';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment) private equipmentRepository: typeof Equipment,
    private readonly fileService: FilesService,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const equipment = await this.equipmentRepository.create({
      total_rating: 0,
      ...createEquipmentDto,
      price: +createEquipmentDto.price,
      image: fileName,
      user_id: +createEquipmentDto.user_id,
    });
    return equipment;
  }
}
