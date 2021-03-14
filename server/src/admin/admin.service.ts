import { Injectable } from '@nestjs/common';
import { RetailerService } from 'src/retailer/retailer.service';
import { FindRetailerDto } from 'src/retailer/dto/find-retailer.dto';
import { Retailer } from 'src/retailer/interfaces/retailer';
import { Shop } from 'src/retailer/interfaces/shop';

@Injectable()
export class AdminService {

    constructor(
        private retailerService:RetailerService,

    ){}

    /*  these functionalities are realated to retailer module, i.e retailer  */
    
    async findRetailer(findRetailer:FindRetailerDto):Promise<Retailer[]>{

        

        return await this.retailerService.searchRetailerByAdmin(findRetailer);

    }

    async findAllShops(email:String):Promise<Shop[]>
    {
        return this.retailerService.getAllShopsOfRetailer(email);
    }


    async setShopCanSellStatus(shop_id:String,can_sell:Boolean):Promise<Shop>
    {

        var shop:Shop=await this.retailerService.getParticularShop(shop_id);

        shop.can_sell=can_sell;

        return await shop.save();


    }








}
