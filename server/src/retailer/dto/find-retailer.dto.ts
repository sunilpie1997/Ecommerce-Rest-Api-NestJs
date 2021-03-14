import { RetailerQueryEnum } from "src/retailer/enums/retailer-query-enum";
import { IsNotEmpty, IsString, IsEnum } from "class-validator";

export class FindRetailerDto{

    /* admin an search retailer by username,email,contact,etc (defined in this enum) */
    @IsEnum(RetailerQueryEnum,{message:'enter valid search parameter'})
    type:String;

    @IsNotEmpty()
    @IsString()
    value:String;

    

}