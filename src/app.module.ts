import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HireJobModule } from './hire-job/hire-job.module';
import { SkillModule } from './skill/skill.module';
import { JobTypeModule } from './job-type/job-type.module';
import { JobModule } from './job/job.module';
import { JobDetailModule } from './job-detail/job-detail.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UserModule, AuthModule, JobModule, JobDetailModule, CommentModule, JobTypeModule, SkillModule, HireJobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
