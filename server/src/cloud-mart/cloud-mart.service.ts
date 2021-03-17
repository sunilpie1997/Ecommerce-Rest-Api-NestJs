import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Shop } from 'src/retailer/interfaces/shop';
import { ShopService } from 'src/shop/shop.service';
import { Category } from 'src/shop/interfaces/category'
import { RetailerService } from 'src/retailer/retailer.service';


@Injectable()
export class CloudMartService {


    constructor(
        private readonly shopService:ShopService,
        private readonly retailerService:RetailerService
      ){}
      
     async  getShopsByPincode(pincode:String,page_no:number=1,take=20):Promise<Shop[]>
      {
       
        const shopModel:Model<Shop>=await this.retailerService.getShopModel();
        const shops:Shop[]=await shopModel.find({pincode:pincode,can_sell:true}).skip((page_no-1)*take).limit(take).exec();

        return shops;

    
      }
    

      /* get all products From a particular (unique) category from a shop 
      Note:valiadtion to check if above shop can sell.
      */
      async getProductsFromShopByCategory(shop_id:String,category_id:String):Promise<Category>
      {

        return await this.shopService.getProductsByCategory(shop_id,category_id);
      }





      

}
