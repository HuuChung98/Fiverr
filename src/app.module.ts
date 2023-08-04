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
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// import { PassportModule } from '@nestjs/passport'; 
import { JwtStrategy } from './strategy/jwt.strategy';



@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: "jwt"}),
    UserModule, 
    AuthModule, 
    JobModule, 
    JobDetailModule, 
    CommentModule, 
    JobTypeModule, 
    SkillModule, 
    HireJobModule,
    ConfigModule.forRoot( 
      { isGlobal: true }
      ),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
