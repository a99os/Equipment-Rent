import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateEquipmentDto } from './dto/create-equipment.to';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
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

  async getEquepments() {
    return this.equipmentRepository.findAll();
  }

  async update(updateEquipmentDto: UpdateEquipmentDto, image: any, id: number) {
    const equipment = await this.equipmentRepository.findByPk(id);
    if (!equipment) {
      throw new HttpException('Equipment topilmadi', HttpStatus.NOT_FOUND);
    }
    equipment.name = updateEquipmentDto.name || equipment.name;
    equipment.description =
      updateEquipmentDto.description || equipment.description;
    equipment.price = +updateEquipmentDto.price || equipment.price;
    if (image) {
      await this.fileService.deleteFile(equipment.image);
      equipment.image = await this.fileService.createFile(image);
    }

    await equipment.save();
    return equipment;
  }

  async delete(id: number) {
    const equipment = await this.equipmentRepository.findByPk(id);
    if (!equipment) {
      throw new HttpException('Equipment topilmadi', HttpStatus.NOT_FOUND);
    }
    await this.equipmentRepository.destroy({ where: { id } });
    await this.fileService.deleteFile(equipment.image);
    return equipment;
  }
}
