import { Injectable } from '@nestjs/common';
import { RetailerService } from 'src/retailer/retailer.service';
import { Shop } from 'src/retailer/interfaces/shop';
import { Category } from 'src/shop/interfaces/category';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { connection, Connection, Model } from 'mongoose';
import { CategoryErrors } from 'src/shop/messages/category.errors';
import { AddProductDto } from 'src/shop/dto/add-product.dto';
import { CategoryConstraints } from 'src/shop/constraints/category.constraints';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user';
import { UserErrors } from 'src/user/messages/user.errors';
import { Retailer } from 'src/retailer/interfaces/retailer';
import { CategorySuccess } from './messages/category.success';
import { ShopModuleErrors } from './messages/shop.error';
import { ShopModuleSuccess } from './messages/shop.success';

@Injectable()
export class ShopService {

    constructor(
        private retailerService:RetailerService,
        private readonly userService:UserService,
        @InjectModel('Category') private readonly CategoryModel: Model<Category>,
        @InjectConnection('mongodb') private connection: Connection,

        ){}
    
    // can be used in all modules to get all products
    async getProductsByCategory(shop_id:String,category_id:String):Promise<Category>
    {

        const category:Category=await this.CategoryModel.findOne({_id:category_id}).populate('shop').exec();

        if(category===null)
        {
            throw new Error(CategoryErrors.DOES_NOT_EXIST);
        }
        else
        {   
            if(category.shop._id==shop_id)
            {   
                return category;
            }

            else
            {
                throw new Error(CategoryErrors.DOES_NOT_EXIST+" for this shop")
            }
        }

    }

    
    /* add transaction in future as both sides needs to be saved */
    /* used by retailer */
    
    async addCategory(email:String,shop_id:String,category_name:String):Promise<String>
    {
        
        //create session and start transaction 
        const session=await connection.startSession();
        session.startTransaction();

        const shopModel:Model<Shop>=await this.retailerService.getShopModel();
        
        //attach seesion with query
        const shop:Shop=await shopModel.findOne({_id:shop_id}).populate('retailer').session(session).exec();
        
        //to check ownership of shop 
        if(shop.retailer.email!=email)
        {
            throw new Error(ShopModuleErrors.OWNERSHIP)
        }
        
        // checking if category exists

        const categories:Map<String,String>=shop.categories;

        if(categories.has(category_name))
        {
            throw new Error(CategoryErrors.CATEGORY_EXIST);
        }
        
        // if category does not exist ,create one

        const new_category:Category=new this.CategoryModel();
        
        new_category.category_name=category_name;

        new_category.shop=shop;

        const saved_category:Category=await new_category.save({session:session});

        //console.log("new category object created with shop property set");

        // add saved_category 'name' and 'ObjectId' to 'categories' map in 'shop'
        shop.categories.set(saved_category.category_name,saved_category._id);

        await shop.save();

        //console.log("shop's categories map set");
        
        //commit transaction
        await session.commitTransaction();
        //end session
        session.endSession();

        return CategorySuccess.CATEGORY_ADDED;
        
    }
    

    /* functionality to add single product at once (limit is set for total products in on category) */
    async addProductByCategory(email:String,shop_id:String,category_id:String,product:AddProductDto):Promise<String>
    {
        /* check ownership of shop */
        const shop:Shop=await this.retailerService.getParticularShop(shop_id);

        if(shop.retailer.email!=email)
        {
            throw new Error(ShopModuleErrors.OWNERSHIP);
        }

        /* checking if category exists */

        const category:Category=await this.CategoryModel.findOne({_id:category_id}).populate('shop').exec();

        if(category===null)
        {
            throw new Error(CategoryErrors.DOES_NOT_EXIST);
        }

        if(category.shop._id!=shop_id)
        {
            throw new Error(CategoryErrors.DOES_NOT_EXIST_FOR_SHOP)
        }

        //check if maximum capapcity is reached
        if(category.products.size===CategoryConstraints.MAX_PRODUCTS_PER_CATEGORY_VALUE)
        {
            throw new Error(CategoryErrors.MAX_PRODUCTS_PER_CATEGORY_MESSAGE)
        }

        //conditions passed...now add product
        category.products.set(product.id,product.product_name);
        category.descriptions.set(product.id,product.description);
        category.prices.set(product.id,product.prices);
        
        // optional
        if(product.colours)
        {
            category.colours.set(product.id,product.colours);
        }
        //optional
        if(product.sizes)
        {
            category.sizes.set(product.id,product.sizes);
        }

        await category.save();
        return CategorySuccess.PRODUCT_ADDED;

    }

    // set offline/online status by retailer
    async setShopStatus(email:String,shop_id:String,status:Boolean):Promise<String>
    {
        const shop:Shop=await this.retailerService.getParticularShop(shop_id);
        
        //check ownership
        if(shop.retailer.email!=email)
        {
            throw new Error(ShopModuleErrors.OWNERSHIP);
        }

        shop.status=status;

        await shop.save();

        return ShopModuleSuccess.SHOP_STATUS;

    }
    

    /*  to register user by shop owner.This user has special priveleges */

    async registerUserByShop(email:String,shop_id:String,user_email:String):Promise<String>
    {

        const user:User=await this.userService.findUser(user_email);

        let iterable:IterableIterator<String>=user.profile.registered_shops.values();

        let result=iterable.next();

        while(!result.done)
        {
            if(result.value==shop_id)
            {
                throw new Error(UserErrors.USER_ALREADY_REGISTERED_AS_MEMBER);
            }
            result=iterable.next();
        }
        //if passed we have to proceed
        const shop:Shop=await this.retailerService.getParticularShop(shop_id);
        
        //check ownership
        if(shop.retailer.email!=email)
        {
            throw new Error(ShopModuleErrors.OWNERSHIP);
        }

        else
        {
            user.profile.registered_shops.set(shop.shop_name,shop._id);
            await user.save();
            return ShopModuleSuccess.USER_SUCCESSFULLY_REGISTERED;

        }

    }



    async getCategoryModel():Promise<Model<Category>>
    {

        return this.CategoryModel;
    }



}
