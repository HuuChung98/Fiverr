import { Injectable } from '@nestjs/common';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';

@Injectable()
export class JobTypeService {
  createJobType(createJobTypeDto: CreateJobTypeDto) {
    return 'tra ve loai cong viec';
  }

  getJobType() {
    return `Tra ve loai cong viec`;
  }

  getJobType_Page() {
    return `Phan trang loai cong viec`;
  }

  jobTypeDetail() {
    return `Tra ve chi tiet loai cong viec`;
  }

  updateTypeJob(id: number) {
    return `Tra ve cap nhat loai cong viec`;
  }


  removeJobType(id: number) {
    return `Xoa loai cong viec`;
  }
}
