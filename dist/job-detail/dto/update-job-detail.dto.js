"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_job_detail_dto_1 = require("./create-job-detail.dto");
class UpdateJobDetailDto extends (0, mapped_types_1.PartialType)(create_job_detail_dto_1.CreateJobDetailDto) {
}
exports.UpdateJobDetailDto = UpdateJobDetailDto;
//# sourceMappingURL=update-job-detail.dto.js.map