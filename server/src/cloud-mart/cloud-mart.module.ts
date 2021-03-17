import { Module } from '@nestjs/common';
import { CloudMartService } from 'src/cloud-mart/cloud-mart.service';
import { CloudMartController } from 'src/cloud-mart/cloud-mart.controller';
import { ShopModule } from 'src/shop/shop.module';
import { RetailerModule } from 'src/retailer/retailer.module';


@Module({
  providers: [CloudMartService],
  controllers: [CloudMartController],
  imports:[ShopModule,RetailerModule]
})
export class CloudMartModule {}
