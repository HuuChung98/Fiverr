"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHireJobDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hire_job_dto_1 = require("./create-hire-job.dto");
class UpdateHireJobDto extends (0, mapped_types_1.PartialType)(create_hire_job_dto_1.CreateHireJobDto) {
}
exports.UpdateHireJobDto = UpdateHireJobDto;
//# sourceMappingURL=update-hire-job.dto.js.map