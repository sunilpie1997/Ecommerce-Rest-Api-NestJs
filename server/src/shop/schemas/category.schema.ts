import * as mongoose from 'mongoose';
import { CategoryConstraints } from 'src/shop/constraints/category.constraints';

export const CategorySchema=new mongoose.Schema({


    category_name:{

        type:String,
        required:true,
        index:true,
        maxlength:[CategoryConstraints.CATEGORY_NAME_MAXVALUE,CategoryConstraints.CATEGORY_NAME_MAXLENGTH],
        lowercase:true,

        },

    shop:{

        type:mongoose.Types.ObjectId,
        ref:'Shop',
        required:true,
        index:true,


        },

    products:{

        type:Map,
        of:String,
        default:new Map<String,String>(),
        },

    descriptions:{

        type:Map,
        of:String,
        default:new Map<String,String>(),
    },

    sizes:{

        type:Map,
        of:[String],
        default:new Map<String,String[]>(),
    },

    colours:{

        type:Map,
        of:[String],
        default:new Map<String,String[]>(),
    },

    weights:{

        type:Map,
        of:[String],
        default:new Map<String,String[]>(),
    },

    variants:{
        type:Map,
        of:[String],
        default:new Map<String,String[]>(),
    },

    prices:{

        type:Map,
        of:[Number],
        default:new Map<String,Number[]>(),

        }

})