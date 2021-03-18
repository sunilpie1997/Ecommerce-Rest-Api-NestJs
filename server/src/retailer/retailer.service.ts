import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Retailer } from 'src/retailer/interfaces/retailer';
import { CreateShopDto } from 'src/retailer/dto/create-shop.dto';
import { Shop } from 'src/retailer/interfaces/shop';
import { FindRetailerDto } from 'src/retailer/dto/find-retailer.dto';
import { RetailerQueryEnum } from 'src/retailer/enums/retailer-query-enum';
import { RetailerErrors } from 'src/retailer/messages/retailer.errors';
import { AdminErrors } from 'src/admin/messages/admin.errors';
import { ShopErrors } from 'src/retailer/messages/shop.errors';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user';
import { RetailerSuccess } from './messages/retailer.success';
import { ShopSuccess } from './messages/shop.success';

@Injectable()
export class RetailerService {

    constructor(
        @InjectModel('Retailer') private readonly RetailerModel: Model<Retailer>,
        @InjectModel('Shop') private readonly ShopModel: Model<Shop>,
        @InjectConnection('mongodb') private connection: Connection,
        private userService:UserService
    ){
        console.log("connected to mongodb cloud through mongoose");
    }

    /* used by all modules to fund if retailer exists with email */
    async findRetailer(email:String):Promise<Retailer>{
        
        const retailer:Retailer=await this.RetailerModel.findOne({email:email}).exec();
        
        if(retailer===null)
        {
            throw new Error(RetailerErrors.RETAILER_DOES_NOT_EXIST);
        }
        else
        {
            return retailer;
        }
    
    }

    /* register retailer */
    async registerRetailer(email:String):Promise<String>{


        const user:User=await this.userService.findUser(email);
        
        //check if this retailer already exists (email and contact_no are unique for retailer)
        const retailers:Retailer[]=await this.RetailerModel.find({$or:[{email:email}, {contact_no:user.profile.contact_no}]}).exec();

        if(retailers.length===0)
        {
            //it means retailer does not exist with given email or contact_no
            let new_retailer:Retailer=new this.RetailerModel();
    
            new_retailer.email=email;
            new_retailer.first_name=user.first_name;
            new_retailer.last_name=user.last_name;
            
            if(!user.profile.contact_no)
            {
                throw new Error(RetailerErrors.CONTACT_NO_REQUIRED);
            }

            new_retailer.contact_no=user.profile.contact_no;
        

            await new_retailer.save();

            return RetailerSuccess.SUCCESSFULL_REGISTRATION;
        }
        
        else
        {
            throw new Error(RetailerErrors.RETAILER_EXIST);
        }

    }


    async registerShopByRetailer(email:String,new_shop:CreateShopDto):Promise<String>
    {

        const retailer:Retailer= await this.findRetailer(email);
        
        
        const shop:Shop=new this.ShopModel(new_shop);
            
        //set retailer for shop
        shop.retailer=retailer;

        shop.save();

        return ShopSuccess.SUCCESSFULL_REGISTRATION;


        }


    async searchRetailerByAdmin(findRetailerDto:FindRetailerDto):Promise<Retailer[]>{

        let retailers:Retailer[];
        const type:String=findRetailerDto.type;
        const value:String=findRetailerDto.value;
    
        if(type==RetailerQueryEnum.CONTACT_NO)
            {
                retailers=await this.RetailerModel.find({contact_no:value}).exec();
    
            }
        else
            {
                
                if(type==RetailerQueryEnum.EMAIL)
                {
                    retailers=await this.RetailerModel.find({email:value}).exec();
                }
    
                else
                {
                    /* this code is unreachable as nestJs will not allow valus not defined
                    in RetailerQueryEnum (because of global validation scope set currently)
                    still if in future 'RetailerQueryEnum' has additional search parameter,we can add below functionality */
                    throw new Error(AdminErrors.SUPPORTED_SEARCH);
                }
                    
            }
            
    
            return retailers;
            
                
        }

        /* no need to populate retailers WE DON'T NEED  */
        async getAllShopsOfRetailer(email:String):Promise<Shop[]>
        {
            const retailer:Retailer=await this.findRetailer(email);

            const shops:Shop[]=await  this.ShopModel.find({retailer:retailer._id}).exec();

           return shops;
            
        }

        /* used by all modules to get shop details */
        async getParticularShop(shop_id:String):Promise<Shop>
        {

            const shop:Shop=await this.ShopModel.findOne({_id:shop_id}).populate('retailer').exec();

            if(shop===null)
            {
                throw new Error(ShopErrors.DOES_NOT_EXIST);
            }
            else
            {
                return shop;
            }
    
        
        }


        async getShopModel():Promise<Model<Shop>>{

            return this.ShopModel;
        }




    }







