import { ApiProperty } from "@nestjs/swagger"

export class CreateJobDetailDto {

    @ApiProperty({ description: "id", type: Number })
    chiTiet_id: number

    @ApiProperty({ description: "tenChiTiet", type: String })
    ten_chi_tiet: string

    @ApiProperty({ description: "loaiCongViec", type: Number })
    loaiCongViec_id: number

    @ApiProperty({ description: "nhomChiTietLoai", type: String })
    nhom_chi_tiet_loai: string
}
