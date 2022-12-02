import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Equipment } from 'src/equipment/equipment.model';
import { User } from 'src/users/users.model';
import { Comment } from './comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(Equipment) private equipmentRepository: typeof Equipment,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userRepository.findByPk(createCommentDto.user_id);
    if (!user) {
      throw new HttpException('User topilmadi', HttpStatus.NOT_FOUND);
    }
    const equipment = await this.equipmentRepository.findByPk(
      createCommentDto.equipment_id,
    );
    if (!equipment) {
      throw new HttpException('Equipment topilmadi', HttpStatus.NOT_FOUND);
    }
    const comment = await this.commentRepository.create(createCommentDto);

    let ratings = [];
    if (createCommentDto.rating) {
      ratings = await this.commentRepository.findAll({
        where: {
          [Op.and]: [
            { equipment_id: createCommentDto.equipment_id },
            { rating: { [Op.ne]: 0 } },
          ],
        },
      });
    }
    let total_rating = 0;
    if (ratings.length) {
      const sum = ratings.reduce((a: number, b: IRating) => {
        return a + b.rating;
      }, 0);
      total_rating = sum / ratings.length;
    }
    const equipPrice = await this.equipmentRepository.findByPk(
      createCommentDto.equipment_id,
    );
    console.log(total_rating);
    equipPrice.total_rating = +total_rating.toFixed(2);
    equipPrice.save();
    return comment;
  }
}
interface IRating {
  rating: number;
}
