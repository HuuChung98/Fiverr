import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Skill")
@Controller('api/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  getSkill() {
    return this.skillService.getSkill();
  }
}
