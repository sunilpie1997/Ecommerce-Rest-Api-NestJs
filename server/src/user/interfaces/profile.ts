import { Document } from 'mongoose';


export interface Profile extends Document{


    contact_no:String;

    registered_shops:Map<String,String>;

    area:String;

    city:String;

    state:String;

    pincode:String;

    image:String;

}