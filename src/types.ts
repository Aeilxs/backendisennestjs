/**
 * REQ / JWT
 */

export interface JwtPayload {
    id: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export interface JwtRequest extends Request {
    user: JwtPayload;
}

/**
 * ROLES
 */

export enum UserRole {
    USER = 'ROLE_USER',
    ADMIN = 'ROLE_ADMIN',
}

/**
 * ENTITIES ENUM
 */

export enum UpdateLiftOption {
    ADD = 'ADD',
    RMV = 'RMV',
}

export enum LiftStatus {
    OFF = 0,
    ON = 1,
}

export enum TrailStatus {
    OFF = 0,
    ON = 1,
}

export enum TrailDifficulty {
    GREEN = 0,
    BLUE = 1,
    RED = 2,
    BLACK = 3,
}
