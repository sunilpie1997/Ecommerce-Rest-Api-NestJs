import {IsOptional, Length, Matches } from "class-validator";

export class UpdateUserDetailsDto{

    /*  currently user contact_no and address details can be updated */
    
    //contact_no
    @IsOptional()
    @Matches(/^[1-9][0-9]{9}$/,{message:'Enter valid contact no'})
    readonly contact_no:String;

   
    //area
    @IsOptional()
    @Matches(/^\w+( +\w+)*$/,{message:'Enter valid area'})
    @Length(3,50,{message:'area length should be between 3 and 50'})
    readonly area:String;

    //city
    @IsOptional()
    @Matches(/^[a-zA-Z]+( +[a-zA-Z]+)*$/,{message:'Enter valid city'})
    @Length(3,50,{message:'city length should be between 3 and 50'})
    readonly city:String;

    //state
    @IsOptional()
    @Matches(/^[a-zA-Z]+( +[a-zA-Z]+)*$/,{message:'Enter valid state'})
    @Length(3,50,{message:'state length should be between 3 and 50'})
    readonly state:String;

    //pincode
    @IsOptional()
    @Matches(/^[1-9][0-9]{5}$/,{message:'Enter valid pincode'})
    readonly pincode:String;

}