import { Controller, Post, UseGuards,Request, Get, HttpException, HttpStatus,Res, Body, Render } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { PasswordChangeDto } from './dto/password-change.dto';

@Controller('google/')
export class AuthController {

    constructor(private readonly authService:AuthService)
    {}
    
    /* this route returns jwt token when user passes credentials */
    @UseGuards(LocalAuthGuard)    
    @Post('get_token/')
    async login(@Request() req) 
    {
        return this.authService.login(req.user);
    }


    /* user login or register through google 
    we set the session property to remember user,so that he can change his password */
    @UseGuards(GoogleAuthGuard)
    @Get('login_with_google/')
    async googleAuth(@Request() req) {}


    /* redirect callback  */
    @UseGuards(GoogleAuthGuard)
    @Get('redirect')
    /*@Render('register')*/
    async googleAuthRedirect(
        @Request() req,
        @Res() res
    )
    {
    
        try
        {
            /* this route is guarded ,so we will always have a user associated with 'request' object */
            
            await this.authService.registerUser(req);
            /*

            const message:String=await this.authService.registerUser(req);

            const userDetails=req.user;
            
            return {
                message:message,
                email:userDetails.email,
                name:userDetails.first_name+' '+userDetails.last_name,
            };
            */
           return res.redirect('/');
            
        }
        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
        }

    }


    /* route for password change form */
    @UseGuards(AuthenticatedGuard)
    @Get('change_password/')
    @Render('password_form')
    async password_change_form(
        @Request() req
        
    )
    {
        let email:String=null,name:String=null;

      if(req.user)
      {
        const userDetails=req.user;
        email=userDetails.email;
        name=userDetails.first_name+" "+userDetails.last_name;
       
        }

      return {
          
          name:name,
          email:email,
          
      };
      
        
    }



    /* route to change user password */
    @UseGuards(AuthenticatedGuard)
    @Post('change_password/')
    @Render('password')
    async change_password(
        @Request() req,
        @Body() PasswordForm:PasswordChangeDto
    )
    {
        let email:String=null,name:String=null,message:String=null,error:Boolean=false;

      if(req.user)
      {
        const userDetails=req.user;
        email=userDetails.email;
        name=userDetails.first_name+" "+userDetails.last_name;
        
    
        message=await this.authService.changePassword(email,PasswordForm.password);
        
       
    }

      return {
          message:message,
          name:name,
          email:email,
          error:error
      };
      
        
    }

    /* to logout user,destroy session */
    @UseGuards(AuthenticatedGuard)
    @Get('logout/')
    async logout(
        @Request() req,
        @Res() res
    )
    {
        req.logout();
        res.redirect('/');
    }


    
}
