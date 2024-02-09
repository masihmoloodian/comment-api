import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    readonly parentId?: string
}
