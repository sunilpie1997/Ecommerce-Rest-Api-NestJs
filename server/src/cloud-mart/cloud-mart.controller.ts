import { Controller, Param, Get, UseGuards, HttpException, HttpStatus, CacheInterceptor, UseInterceptors, Query } from '@nestjs/common';
import { CloudMartService } from 'src/cloud-mart/cloud-mart.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Shop } from 'src/retailer/interfaces/shop';
import { validatePincode } from 'src/shared/validation/validate-pincode';
import { Category } from 'src/shop/interfaces/category';
import { CloudMartErrors } from './messages/cloud-mart.errors';


@UseGuards(JwtAuthGuard)
@Controller('cloud-mart/')
export class CloudMartController {

    constructor(private readonly cloudService:CloudMartService){}

    /* check if page_no can be optional, for example,while retrieving first page */
    @Get('shops/:pincode/')
    async getShopsByType(
        @Param('pincode') pincode:String,
        @Query('page_no') page_no?:number,
        @Query('take') take?:number
    ):Promise<Shop[]>
    {

        try
        {
            if(validatePincode(pincode))
            {
                return await this.cloudService.getShopsByPincode(pincode,page_no,take);
            }
            else
            {
                throw new Error(CloudMartErrors.INVALID_PINCODE);
            }
            
            
        }

        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
 
        }
    }

    @Get('shops/:shop_id/:category_id/')
    async getAllProductsByCategory(
        @Param('shop_id') shop_id:String,
        @Param('category_id') category_id:String

    ):Promise<Category>
    {

        try
        {
            
            return await this.cloudService.getProductsFromShopByCategory(shop_id,category_id);
            
        }

        catch(error)
        {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
 
        }

    }













}
