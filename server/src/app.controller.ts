import { Controller, Get, Render, Request } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  /* get homepage page */
  @Get()
  @Render('index')
  getHello(@Request() req) {
    
      let email:String=null,name:String=null;

      if(req.user)
      {
        const userDetails=req.user;
        email=userDetails.email;
        name=userDetails.first_name+" "+userDetails.last_name;
      }

      return {
        message:"Welcome to Cloud Mart",
        name:name,
        email:email

      };
  

  }

 

}
