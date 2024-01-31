import { User } from '@/app/user/entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetToken = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    return request;
});
