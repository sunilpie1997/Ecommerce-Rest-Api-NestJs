import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/interfaces/user';
import { Model } from 'mongoose';
import { UserErrors } from 'src/user/messages/user.errors';
import { Profile } from 'src/user/interfaces/profile';
import { UpdateUserDetailsDto } from './dto/update-user.dto';
import { UserSuccess } from './messages/user.success';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly UserModel: Model<User>,
        @InjectModel('Profile') private readonly ProfileModel: Model<Profile>
    ){}
    
        /* used by  modules to search user by email */
        async findUser(userEmail:String):Promise<User>
        {
    
            const user:User=await this.UserModel.findOne({email:userEmail}).exec();
    
            if(user===null)
            {
                throw new Error(UserErrors.USER_DOES_NOT_EXISTS);
            }
            else
            {
                return user;
            }
        }




    async getRegisteredshops(email:String):Promise<Map<String,String>>
    {

        const user:User=await this.findUser(email);

        return user.profile.registered_shops;
        
    }

    /* used by other modules if they want to access 'UserModel' */
    async getUserModel():Promise<Model<User>>
    {
        return this.UserModel;
    }


    /* create new empty 'User' object and returns it */
    async newUser():Promise<User>
    {

        const profile:Profile=new this.ProfileModel();
        const user:User=new this.UserModel();
        user.profile=profile;
        return user;
    }

    async updateUser(email:String,userDetails:UpdateUserDetailsDto):Promise<String>
    {
        const user:User=await this.findUser(email);
        
        if(userDetails.contact_no)
        {
            user.profile.contact_no=userDetails.contact_no;
        }
        if(userDetails.area)
        {
            user.profile.area=userDetails.area;
        }
        if(userDetails.city)
        {
            user.profile.city=userDetails.city;
        }
        if(userDetails.state)
        {
            user.profile.state=userDetails.state;
        }
        if(userDetails.pincode)
        {
            user.profile.pincode=userDetails.pincode;
        }
        
        user.save();
        return UserSuccess.PROFILE_UPDATED;

    }
}
