import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from '../users.service';


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (!userId) {
      throw new NotFoundException('Sign in to access this resource');
    }
    
    const user = await this.usersService.findOne(userId);
    request.currentUser = user;

    return handler.handle();
  }
}