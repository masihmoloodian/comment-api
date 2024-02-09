import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class ApproveCommentDto {
    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    readonly approve: boolean;
}