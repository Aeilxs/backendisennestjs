import { HttpStatus } from '@nestjs/common';

export enum Severity {
    SUCCESS = 'success',
    INFO = 'info',
    WARN = 'warning',
    ERROR = 'error',
}

export interface Resp<T> {
    severity: Severity;
    message: string;
    httpCode: HttpStatus;
    data?: T;
}

export interface AuthRequest extends Request {
    user: {
        id: number;
        email: string;
        iat: number;
        exp: number;
    };
}
