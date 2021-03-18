import {Length, Matches } from "class-validator";

export class UpdateShopDetailsDto{

    /*  currently shop_email, shop_type and contact_no can be updated */
    
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



}