import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Skill")
@Controller('api/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) { }

  @ApiBearerAuth()
  @ApiHeader({ name: "Token", description: "JWT token" })
  @UseGuards(AuthGuard("jwt")) // jwt là key mặc định
  @Get()
  getSkill() {
    return this.skillService.getSkill();
  }
}
