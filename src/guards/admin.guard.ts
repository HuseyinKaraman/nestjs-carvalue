import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('AdminGuard - currentUser:', request.currentUser);
    if (!request.currentUser) {
      return false;
    }

    return request.currentUser.isAdmin;
  }
}
