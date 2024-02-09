import { BadRequestException } from "@nestjs/common";

export function isValidUUID(uuid: string): boolean {
    const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const isValid =  regexExp.test(uuid);
    if (!isValid) throw new BadRequestException("Invalid UUID")
    return true
}