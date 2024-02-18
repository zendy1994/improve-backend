import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, _info: any, context: any, _status: any) {
    if (err || !user || this.isTokenBlacklisted(user, context)) {
      throw err || new UnauthorizedException("Token has expired");
    }

    return user;
  }

  private isTokenBlacklisted(user: any, context: any): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];

    return user.blacklisted_tokens && user.blacklisted_tokens.includes(token);
  }
}
