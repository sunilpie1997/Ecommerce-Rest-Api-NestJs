import { Controller, UseGuards, Get ,Request, HttpException, HttpStatus, Post,Put, Body} from '@nestjs/common';
import { RetailerService } from 'src/retailer/retailer.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Retailer } from 'src/retailer/interfaces/retailer';
import { CreateShopDto } from 'src/retailer/dto/create-shop.dto';
import { Shop } from 'src/retailer/interfaces/shop';

@UseGuards(JwtAuthGuard)
@Controller('retailer/')
export class RetailerController {

  constructor(private readonly retailerService: RetailerService) {}


  /* get retailer details */
  @Get()
  async getRetailerDetails(

    @Request() req): Promise<Retailer> {

    try{

      /* email is present in token payload, and is extracted by above 'JwtAuthGuard'  */
      const email=req.user.email;
      
      return await this.retailerService.findRetailer(email);
    
    }
    
    catch(error)
    {
    
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    
    }
  }

  @Post('create/')
  async registerRetailer(
    @Request() req,
  ):Promise<String>{
    
    try{

      const email=req.user.email;

      
      return await this.retailerService.registerRetailer(email);
      
      }
      
      catch(error){
        
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    
    }
    

  }

  @Post('create_shop/')
  async registerShop(
    @Request() req,
    @Body() new_shop:CreateShopDto
  ):Promise<String>{

    try
    {

      const email=req.user.email;

      return await this.retailerService.registerShopByRetailer(email,new_shop);

    }
    catch(error)
    {

      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    }


  }

  
  @Get('shops/')
  async getAllShops(
    @Request() req
  ):Promise<Shop[]>
  {

    try
    {

      const email=req.user.email;

      return await this.retailerService.getAllShopsOfRetailer(email);

    }
    catch(error)
    {

      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    }


  }



  

}
