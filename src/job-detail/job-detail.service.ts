import { Injectable } from '@nestjs/common';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';

@Injectable()
export class JobDetailService {
  create(createJobDetailDto: CreateJobDetailDto) {
    return 'This action adds a new jobDetail';
  }

  findAll() {
    return `This action returns all jobDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobDetail`;
  }

  update(id: number, updateJobDetailDto: UpdateJobDetailDto) {
    return `This action updates a #${id} jobDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobDetail`;
  }
}
