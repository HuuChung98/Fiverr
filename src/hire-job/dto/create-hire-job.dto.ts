import { ApiProperty } from "@nestjs/swagger";

const date: Date = new Date();
const isoString: string = date.toISOString();

export class CreateHireJobDto {
    @ApiProperty({ description: "id", type: Number})
    thue_cong_viec_id: number

    @ApiProperty({ description: "maCongViec", type: Number})
    congViec_id: number

    @ApiProperty({ description: "maNguoiThue", type: Number})
    nguoi_dung_id: number

    @ApiProperty({ description: "ngayThue", type: isoString})
    ngay_thue: string

    @ApiProperty({ description: "hoanThanh", type: Boolean})
    hoan_thanh: boolean
}
