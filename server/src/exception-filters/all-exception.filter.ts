import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

/* Although NestJs provides an inbuilt HttpException Handler by default, but the unknown errors throw 
  'InternalServorException', that we need to catch.So.....
*/
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

     const statusCode=exception instanceof HttpException
                      ?exception.getStatus():
                      HttpStatus.INTERNAL_SERVER_ERROR;
    

    if(exception instanceof HttpException)
    {
      let errorBody=exception.getResponse();
      
      let message:String;

      errorBody instanceof String ?message=errorBody:errorBody["message"]==undefined?message=errorBody.toString():message=errorBody["message"];
      response.status(statusCode).json({
        statusCode:statusCode,
        message: message
      
      });

    }
    else
    {
      console.log(exception);
      response.status(statusCode).json({
        statusCode:statusCode
        
      });
    }
    
  }
}