import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/user/interfaces/user';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt=require('bcrypt'); 
import { PasswordSuccess } from './messages/password.success';
import { SignInSuccess } from './messages/signin.success';
import { SignInErrors } from './messages/signin.error';

@Injectable()
export class AuthService {

    constructor(private userService:UserService,private jwtService: JwtService)
    {}


    async login(user: any) {
        const payload = { email: user.email, is_admin:user.is_admin};
        console.log("user:"+JSON.stringify(user));
        return {
          access_token: this.jwtService.sign(payload),
        };
      }


    async validateUser(email:String,password:String):Promise<any>
    {

        try
        {
            /* if no user exists by this email, error is thrown by 'findUser()' */
            const userObject = await this.userService.findUser(email);

            /* compare password entered with hashed password in DB */
            const result= await bcrypt.compare(password,userObject.password.valueOf());
            
            if (result) 
            {
                /* ES6 spread operator to seperate required properties from 'user' object */
                const { email,is_admin} = userObject;
                
                const user={
                    email:email,
                    is_admin:is_admin
                };

                return user;
            }
            else
            {
                return null;
            }
                
        }
        catch(error)
        {
            return null;
        }
            
    }

    /* register user through google OAuth 2.0 */
    async registerUser(request):Promise<String>
    {

        if(!request.user)
        {
            throw new Error(SignInErrors.GOOGLE_SIGNIN_FAILED);
        }

        const userDetails=request.user;

        const userModel:Model<User>=await this.userService.getUserModel();

        /* First check,if user existrs with given email */
        const user:User=await userModel.findOne({email:userDetails.email}).exec();

        /* if no user exists with such email */
        if(user===null)
        {
            let newUser:User=await this.userService.newUser();

            newUser.email=userDetails.email;

            if(userDetails.first_name)
            newUser.first_name=userDetails.first_name;

            if(userDetails.last_name)
            newUser.last_name=userDetails.last_name;

            if(userDetails.picture)
            newUser.profile.image=userDetails.picture;

            await newUser.save();

            /* return this new user */
            return SignInSuccess.REGISTRATION_SUCCESS;
            
        }
        else
        {
            /* return same user if exists */
            return SignInSuccess.USER_ALREADY_EXIST;
        }


    }


    async changePassword(email:String,password:String):Promise<String>
    {
        try
        {
        const user:User = await this.userService.findUser(email);

        const saltRounds=10;
        const hash = await bcrypt.hash(password, saltRounds);

        /* replace plain password with hashed password  */
        user.password=hash;

        /* save user */
        await user.save();

        return PasswordSuccess.SUCCESSFULL_CHANGE;
        }
        catch(error)
        {
            return "error occurred:"+error.message;
            
        }

    }




}