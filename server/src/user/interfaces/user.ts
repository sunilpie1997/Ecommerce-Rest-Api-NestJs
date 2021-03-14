import { Document } from 'mongoose';
import { Profile } from 'src/user/interfaces//profile';


export interface User extends Document{

    password:String;

    email:String;

    first_name:String;

    last_name:String;

    is_admin:Boolean;

    last_login:Date;

    created_date:Date;

    modified_date:Date;

    profile:Profile;

}