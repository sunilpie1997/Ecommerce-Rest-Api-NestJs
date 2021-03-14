import { Module } from '@nestjs/common';
import { RetailerController } from 'src/retailer/retailer.controller';
import { RetailerService } from 'src/retailer/retailer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RetailerSchema } from 'src/retailer/schemas/retailer.schema';
import { ShopSchema } from 'src/retailer/schemas/shop.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  /* connection name 'mongodb' is necessary if using multiple databases, as extra database connections need name */
  imports: [MongooseModule.forFeature([{ name: 'Retailer', schema: RetailerSchema },{name:'Shop',schema:ShopSchema}],"mongodb"),UserModule],
  controllers: [RetailerController],
  providers: [RetailerService],
  exports:[RetailerService]

  /* exporting 'RetailerService' is necessary because 'AdminService' needs some of it's functionality
  NOTE:if not exported,'AdminService' will throw error
  */

})
export class RetailerModule {}
