import * as mongoose from 'mongoose';
import { UserConstraints } from 'src/user/constraints/user.constraints';
import { profileSchema } from 'src/user/schemas/profile.schema';


export const UserSchema=new mongoose.Schema({


    email:{

        type:String,
        required:true,
        index:{unique:true},
        unique:true,
        maxlength:[UserConstraints.EMAIL_MAXVALUE,UserConstraints.EMAIL_MAXLENGTH],
        lowercase:true

        },

        password:{

            type:String,
            required:false,
            maxlength:[UserConstraints.PASSWORD_MAXVALUE,UserConstraints.PASSWORD_MAXLENGTH],
        
            },

        first_name:{

            type:String,
            required:false,
            maxlength:[UserConstraints.FIRSTNAME_MAXVALUE,UserConstraints.FIRSTNAME_MAXLENGTH],
            default:null,
            lowercase:true
            
            },

        last_name:{

            type:String,
            required:false,
            maxlength:[UserConstraints.LASTNAME_MAXVALUE,UserConstraints.LASTNAME_MAXLENGTH],
            default:null,
            lowercase:true
                
            },

        last_login:{

            type:Date,
            required:false,
            default:null
            
            },

        is_admin: {

            type:Boolean,
            default:false
        },

        created_date:{

            type:Date,
            default:Date.now
        },

        modified_date:{

            type:Date,
            default:Date.now
        },
        
        /* whenever a new user is created, a profile object is also created and linked to this property */
        profile:{

            type:profileSchema,
        }

        


});