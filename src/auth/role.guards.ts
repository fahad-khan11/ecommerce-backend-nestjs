import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuards implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // Get roles from metadata (use correct key: 'roles')
        const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler());

        // If no roles are set for the route, deny access
        if (!allowedRoles || allowedRoles.length === 0) {
            throw new BadRequestException('Roles are not defined for this route');
        }

        // Get user from request
        const request = context.switchToHttp().getRequest();
        const userRoles = request?.currentUser?.roles || []; // Ensure it's an array

        // Check if user has any of the required roles
        const hasRole = userRoles.some((role: string) => allowedRoles.includes(role));

        if (hasRole) return true;
        throw new UnauthorizedException('Sorry, you do not have the required role');
    }
}
