import { Document } from 'mongoose';
import { Retailer } from './retailer';


export interface Shop extends Document {

  shop_name: String;

  shop_type:String;

  categories:Map<String,String>,

  shop_email: String;

  contact_no:String,

  can_sell:Boolean;

  status:Boolean;

  area:String;

  city:String;

  state:String;

  pincode:String;

  retailer:Retailer;

  created_date:Date;

  modified_date:Date;

  image:String;



  
}