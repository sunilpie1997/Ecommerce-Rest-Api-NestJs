import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from 'src/admin/admin.service';
import { RetailerModule } from 'src/retailer/retailer.module';

@Module({
  imports:[RetailerModule],
  controllers: [AdminController],
  providers: [AdminService],
  
})
export class AdminModule {}
