import { Matches } from "class-validator";

export class PasswordChangeDto{

    @Matches(/^[a-zA-Z0-9@#]{8,20}$/,{message:"password must contain only aphabets, numbers, @ and #"})
    readonly password:String;

   


}