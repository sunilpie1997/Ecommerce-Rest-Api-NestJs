/******************************** External Modules ****************************************************/

import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MongooseModule} from '@nestjs/mongoose';
import {config} from 'dotenv';

/*********************************** Files residing in this Module **************************************/

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

/************************************ MODULES IN THIS APP ***********************************************/

import { RetailerModule } from 'src/retailer/retailer.module';
import { ShopModule } from 'src/shop/shop.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

import { AdminModule } from 'src/admin/admin.module';
// import { CloudMartModule } from 'src/cloud-mart/cloud-mart.module';
import { AllExceptionsFilter } from './exception-filters/all-exception.filter';

import { APP_FILTER } from '@nestjs/core';

/* load env variables */
config();

@Module({

  /* when using two databases,make sure to give name to second one */
  imports: [
    
/* postgres database will be used later */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.RELATIONAL_DATABASE_HOST,
      port: parseInt(process.env.RELATIONAL_DATABASE_PORT),
      username: process.env.RELATIONAL_DATABASE_USERNAME,
      password: process.env.RELATIONAL_DATABASE_PASSWORD,
      database: process.env.RELATIONAL_DATABASE_NAME,
      /*
      entities: [User,Profile],
      this can be tedious if you have different entities acreoss diff. modules : Tight-coupling */
      autoLoadEntities:true,

      /***************  NOTE:DISABLE THIS OPTION WHILE IN PRODUCTION *******************/
      synchronize: true,
  
    }),
    MongooseModule.forRoot(process.env.MONGODB_CLOUD_URI,{
      connectionName:"mongodb",
    }),

    RetailerModule,
    ShopModule,
    UserModule,
    AuthModule,
    // CloudMartModule,
    AdminModule,
   
  ],
  controllers: [AppController],
  providers: [AppService,
    
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    
  ],
})
export class AppModule {

  constructor(private connection:Connection
    
    ){
    console.log("connected to postgres");
    
  }
}
