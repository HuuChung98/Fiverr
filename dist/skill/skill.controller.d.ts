import { SkillService } from './skill.service';
export declare class SkillController {
    private readonly skillService;
    constructor(skillService: SkillService);
    getSkill(token: string): Promise<string>;
}
