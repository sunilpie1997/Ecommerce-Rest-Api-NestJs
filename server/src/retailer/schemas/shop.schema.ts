import * as mongoose from 'mongoose';
import { ShopConstraints } from 'src/retailer/constraints/shop.constraints';
import { AddressConstraints } from 'src/shared/constraints/address.constraints';


export const ShopSchema = new mongoose.Schema({
  
    shop_name:{
        type:String,
        maxlength:[ShopConstraints.SHOPNAME_MAXVALUE,ShopConstraints.SHOPNAME_MAXLENGTH],
        required:true,
        index:true,
        },

    shop_type:{


        type:String,
        maxlength:[ShopConstraints.SHOPTYPE_MAXVALUE,ShopConstraints.SHOPTYPE_MAXLENGTH],
        required:true,
        index:true,
        lowercase:true,

        },



        shop_email:{

        type:String,
        maxlength:[ShopConstraints.EMAIL_MAXVALUE,ShopConstraints.EMAIL_MAXLENGTH],
        required:true,
        lowercase:true,

            },

        area:{

            type:String,
            maxlength:[AddressConstraints.AREA_MAXVALUE,AddressConstraints.AREA_MAXLENGTH],
            required:true,
            lowercase:true,
        },

        city:{

            type:String,
            maxlength:[AddressConstraints.CITY_MAXVALUE,AddressConstraints.CITY_MAXLENGTH],
            required:true,
            index:true,
            lowercase:true,
        },

        state:{

            type:String,
            maxlength:[AddressConstraints.STATE_MAXVALUE,AddressConstraints.STATE_MAXLENGTH],
            required:true,
            lowercase:true,
        },

        pincode:{


            type:String,
            maxlength:[AddressConstraints.PINCODE_MAXVALUE,AddressConstraints.PINCODE_MAXLENGTH],
            required:true,
            index:true,
            },

  
        contact_no:{
            type:String,
            maxlength:[AddressConstraints.CONTACTNO_MAXVALUE,AddressConstraints.CONTACTNO_MAXLENGTH],
            required:true

        },

        can_sell:{

            type:Boolean,
            default:false,

        },

        status:{

            type:Boolean,
            default:false,

        },

        retailer:{

            type:mongoose.Types.ObjectId,
            ref:'Retailer',
            required:true,
            index:true,

        },

        categories:{

            type:Map,
            of:mongoose.Types.ObjectId,
            ref:'Category',
            default:new Map<String,String>(),


        },
        
        created_date:{

            type:Date,
            default:Date.now
            
        },
    
        modified_date:{
    
            type:Date,
            default:Date.now
            
        },

        image:{

            type:String,
            required:false,
            default:null,
            
        }

    
});