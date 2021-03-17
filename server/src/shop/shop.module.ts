import { Module } from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { ShopController } from 'src/shop/shop.controller';
import { RetailerModule } from 'src/retailer/retailer.module';
import { CategorySchema } from 'src/shop/schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[RetailerModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }],"mongodb"),
  ],
  providers: [ShopService],
  controllers: [ShopController],
  exports:[ShopService]
})
export class ShopModule {}
