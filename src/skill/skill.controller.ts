import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { SkillService } from './skill.service';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Skill")
@Controller('api/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt")) // jwt là key mặc định
  @Get()
  getSkill(@Headers("token") token: string) {
    return this.skillService.getSkill(token);
  }
}
