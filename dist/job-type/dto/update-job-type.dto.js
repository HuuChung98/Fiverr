"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_job_type_dto_1 = require("./create-job-type.dto");
class UpdateJobTypeDto extends (0, mapped_types_1.PartialType)(create_job_type_dto_1.CreateJobTypeDto) {
}
exports.UpdateJobTypeDto = UpdateJobTypeDto;
//# sourceMappingURL=update-job-type.dto.js.map