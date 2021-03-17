import { IsNotEmpty, Length, IsString, IsArray, ArrayMinSize, ArrayMaxSize, IsOptional, Matches, IsPositive, IsHexColor } from "class-validator";


//NOTE: add extra options from schema like 'variants','weights',etc.

export class AddProductDto{

    //product_id
    @Matches(/^[a-zA-Z0-9]{3,10}$/,{message:'enter valid product id'})
    readonly id:String;

    //product_name
    @Length(3,50,{message:'product name length should be between 3 and 50'})
    @Matches(/^\w+( \w+)*$/,{message:'Enter valid product name'})
    readonly product_name:String;

    //product's description
    @Matches(/^\w+( \w+)*$/,{message:'Enter valid product description'})
    @Length(3,100,{message:'product description length should be between 3 and 100'})
    readonly description:String;

    //prices (array) for single product
    @IsArray({message:'product prices should be an array'})
    @ArrayMinSize(1,{message:'price array should contain minimum 1 value'})
    @ArrayMaxSize(10,{message:'price array should contain max 10 values'})
    @IsPositive({each:true,message:'price should be gretaer than zero'})
    readonly prices:Number[];

    //colours (array) for single product
    @IsOptional()
    @IsArray({message:'product colours should be an array'})
    @ArrayMinSize(1,{message:'colours array should contain minimum 1 value'})
    @ArrayMaxSize(10,{message:'colours array should contain max 10 values'})
    @IsHexColor({each:true,message:'enter valid hex colour'})
    readonly colours:String[];

    //sizes (array) for single product
    @IsOptional()
    @IsArray({message:'product sizes should be an array'})
    @ArrayMinSize(1,{message:'sizes array should contain minimum 1 value'})
    @ArrayMaxSize(10,{message:'sizes array should contain max 10 values'})
    @Matches(/^[a-zA-Z0-9]{1,5}$/,{message:'enter valid size'})
    readonly sizes:String[];



}