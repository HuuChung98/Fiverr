import { Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';

@Injectable()
export class HireJobService {
  createJob(createHireJobDto: CreateHireJobDto) {
    return 'tao cong viec';
  }

  hireJob() {
    return `tra ve cong viec thue`;
  }

  jobPage() {
    return `Phan trang tim kiem`;
  }

  jobDetail(id: number) {
    return `Chi tiet loai cong viec`;
  }

  updateJob(id: number) {
    return `Cap nhat cong viec`;
  }

  removeJob(id: number) {
    return `This action removes a #${id} hireJob`;
  }

  getHiredJob() {
    return `lay danh sach da thue`;
  }

  statusJob(job_id: number) {
    return `lay danh sach da thue`;
  }
}
