import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

/* to allow authenticated requests */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  
    async canActivate(context: ExecutionContext) {
    
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();
  }

}