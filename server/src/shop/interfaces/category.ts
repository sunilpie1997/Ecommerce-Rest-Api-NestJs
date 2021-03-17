import { Document } from 'mongoose';
import { Shop } from 'src/retailer/interfaces/shop';

/* should include all the values returned by mongodb model */
export interface Category extends Document {

    category_name:String;

    shop:Shop;

    products: Map<String,String>;

    descriptions: Map<String,String>;

    sizes: Map<String,String[]>;

    colours:Map<String,String[]>;

    weights:Map<String,String[]>;

    variants:Map<String,String[]>;

    prices:Map<String,Number[]>;

}