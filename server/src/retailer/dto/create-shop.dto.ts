import {  Length, Matches } from "class-validator";

export class CreateShopDto{

    //shop_name
    @Matches(/^\w+( +\w+)*$/,{message:'Enter valid shop name'})
    @Length(3,50,{message:'shop name length should be between 3 and 50'})
    readonly shop_name:String;

    //shop_email
    @Matches(/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/,{message:'Enter valid shop gmail id'})
    @Length(3,50,{message:'shop email length should be between 3 and 50'})
    readonly shop_email:String;

    //shop_type
    @Matches(/^[a-zA-Z]+( +[a-zA-Z]+)*$/,{message:'Enter valid shop type'})
    @Length(3,50,{message:'shop type length should be between 3 and 50'})
    readonly shop_type:String;

    //contact_no
    @Matches(/^[1-9][0-9]{9}$/,{message:'Enter valid contact no'})
    readonly contact_no:String;

    //area
    @Matches(/^\w+( +\w+)*$/,{message:'Enter valid shop area'})
    @Length(3,50,{message:'shop area length should be between 3 and 50'})
    readonly area:String;

    //city
    @Matches(/^[a-zA-Z]+( +[a-zA-Z]+)*$/,{message:'Enter valid shop city'})
    @Length(3,50,{message:'shop city length should be between 3 and 50'})
    readonly city:String;

    //state
    @Matches(/^[a-zA-Z]+( +[a-zA-Z]+)*$/,{message:'Enter valid shop state'})
    @Length(3,50,{message:'shop state length should be between 3 and 50'})
    readonly state:String;

    //pincode
    @Matches(/^[1-9][0-9]{5}$/,{message:'Enter valid pincode'})
    readonly pincode:String;

}