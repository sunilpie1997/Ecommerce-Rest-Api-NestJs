import * as mongoose from 'mongoose';
import {RetailerConstraints} from 'src/retailer/constraints/retailer.constraints';
import { AddressConstraints } from 'src/shared/constraints/address.constraints';


export const RetailerSchema = new mongoose.Schema({

    first_name: {
        
        type:String,
        maxlength:[RetailerConstraints.FIRSTNAME_MAXVALUE,RetailerConstraints.FIRSTNAME_MAXLENGTH],
        required:true,

        },

    last_name:{

        type:String,
        maxlength:[RetailerConstraints.LASTNAME_MAXVALUE,RetailerConstraints.LASTNAME_MAXLENGTH],
        required:false,
        default:null

        },

    email: {

        type:String,
        max_length:[RetailerConstraints.EMAIL_MAXVALUE,RetailerConstraints.EMAIL_MAXLENGTH],
        unique:true,
        index:{unique:true},
        required:true,
        lowercase:true,


        },

    contact_no: {

        type:String,
        maxlength:[AddressConstraints.CONTACTNO_MAXVALUE,AddressConstraints.CONTACTNO_MAXLENGTH],
        unique:true,
        index:{unique:true},
        required:true,
        },


    created_date:{

        type:Date,
        default:Date.now
        
        },

    modified_date:{

        type:Date,
        default:Date.now
        
        },


    
});