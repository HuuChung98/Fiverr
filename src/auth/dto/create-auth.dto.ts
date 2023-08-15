import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
    @ApiProperty({ description: "userId", type: Number})
    nguoi_dung_id: number;

    @ApiProperty({ description: "name", type: Number})
    ten_nguoi_dung: string;

    @ApiProperty({ description: "hinhDaiDien", type: String})
    hinh_dai_dien: string;

    @ApiProperty( { description: "email", type: String})
    email: string;

    @ApiProperty( { description: "password", type: String})
    pass_word: string;

    @ApiProperty( { description: "phone", type: String})
    phone: string;

    @ApiProperty( { description: "birthday", type: String})
    birth_day: string;

    @ApiProperty( { description: "gender", type: String})
    gender: string;

    @ApiProperty({ description: "role", type: String})
    role: string

    @ApiProperty( { description: "certification", type: String})
    certification: string

}
