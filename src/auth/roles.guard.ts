import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Authorize } from './authorize.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>(Authorize, context.getHandler());
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.role || !roles.includes(user.role)) {
            throw new UnauthorizedException("Vous n'avez pas les autorisations nécessaires.");
        }

        return true;
    }
}
