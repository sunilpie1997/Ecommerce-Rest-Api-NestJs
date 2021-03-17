import { Controller, Get, UseGuards,Request, HttpException, HttpStatus, Param, Post, Body, Patch } from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Shop } from 'src/retailer/interfaces/shop';
import { Category } from 'src/shop/interfaces/category';
import { AddProductDto } from 'src/shop/dto/add-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('shop/')
export class ShopController {

    constructor(private shopService:ShopService){}
    
    @Post(':shop_id/user/:email/add/')
        async registerUserAsMember(
            @Request() req,
            @Param('shop_id') shop_id:String,
            @Param('email') user_email:String
        )
        {

            try
            {
                const email:String=req.user.email;
    

                await this.shopService.registerUserByShop(email,shop_id,user_email);
              


            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }
            
        }
    
        @Post(':shop_id/:category_name/add/')
        async addCategory(
            @Request() req,
            @Param('shop_id') shop_id:String,
            @Param('category_name') category_name:String,

        )
        {

            try
            {
                const email:String=req.user.email;
    

                await this.shopService.addCategory(email,shop_id,category_name);
              


            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }

        }

        @Post(':shop_id/:category_id/add_product/')
        async addProductsByCategory(
            @Request() req,
            @Param('shop_id') shop_id:String,
            @Param('category_id') category_id:String, 
            @Body() add_product:AddProductDto,
        )
        {

            try
            {
                const email:String=req.user.email;
    

                await this.shopService.addProductByCategory(email,shop_id,category_id,add_product);
              


            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }

        }

    

        @Patch(':shop_id/status/:new_status/')
        async setShopStatusByRetailer(
            @Request() req,
            @Param('shop_id') shop_id:String,
            @Param('new_status') status:Boolean,

        ):Promise<String>
        {

            try
            {
                const email:String=req.user.email;
    

                return await this.shopService.setShopStatus(email,shop_id,status);
              


            }
            catch(error)
            {
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }
            
        }

        /* NOTE:IF THIS ROUTE IS PLACED ABOVE,THEN ':shop_name/categories/' route never get executed */
    /* enable pagination in future */
    @Get(':shop_id/:category_id/')
    async getAllProductsByCategory(
        @Request() req,
        @Param('shop_id') shop_id:String,
        @Param('category_id') category_id:String,

    ):Promise<Category>
    {
        try
        {

            return await this.shopService.getProductsByCategory(shop_id,category_id);
            
        }

        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
 
        }
    }
        

}
