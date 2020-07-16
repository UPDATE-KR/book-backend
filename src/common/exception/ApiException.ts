import { HttpException } from "@nestjs/common";

export class ApiException extends Error{
    readonly status: number;
    readonly code: string;
    readonly msg: string;

    constructor({ status, code, msg }:{ status: number, code: string, msg: string }) {
        super(msg);

        this.status = status;
        this.code = code;
        this.msg = msg;
    }
}