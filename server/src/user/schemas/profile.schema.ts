import * as mongoose from 'mongoose';
import { AddressConstraints } from 'src/shared/constraints/address.constraints';

export const profileSchema=new mongoose.Schema({


    
        contact_no:{
            type:String,
            maxlength:[AddressConstraints.CONTACTNO_MAXVALUE,AddressConstraints.CONTACTNO_MAXLENGTH],
            default:null,
            required:false

        },
    
        area:{

            type:String,
            required:false,
            maxlength:[AddressConstraints.AREA_MAXVALUE,AddressConstraints.AREA_MAXLENGTH],
            default:null
        },

        city:{

            type:String,
            required:false,
            maxlength:[AddressConstraints.CITY_MAXVALUE,AddressConstraints.CITY_MAXLENGTH],
            default:null
        },

        state:{

            type:String,
            required:false,
            maxlength:[AddressConstraints.STATE_MAXVALUE,AddressConstraints.STATE_MAXLENGTH],
            default:null
        },

        pincode:{


            type:String,
            required:false,
            maxlength:[AddressConstraints.PINCODE_MAXVALUE,AddressConstraints.PINCODE_MAXLENGTH],
            default:null
            },

        registered_shops:{

            type:Map,
            of:mongoose.Types.ObjectId,
            ref:'Shop',
            default:new Map<String,String>(),


        },

        image: {

            type:String,
            default:null,
            required:false,
        }


});