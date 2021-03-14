import { Controller, UseGuards,Request, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/user/interfaces/user';


@UseGuards(JwtAuthGuard)
@Controller('user/')
export class UserController {

    constructor(private readonly userService:UserService){}


    /* get user details */
    @Get()
    async getUserDetails(
        @Request() req,
    ):Promise<User>
    {
        try
        {
            const email:String=req.user.email;

            return await this.userService.findUser(email);
            
        }

        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
 
        }
    }

    /* get registered shops of user */
    @Get('membershops/')
    async getRegisteredShops(
        @Request() req,
    ):Promise<Map<String,String>>
    {
        try
        {
            const email:String=req.user.email;

            return await this.userService.getRegisteredshops(email);
            
        }

        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
 
        }
    }



}
