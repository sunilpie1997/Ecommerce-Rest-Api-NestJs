import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { profileSchema } from 'src/user/schemas/profile.schema';

@Module({

  /* register 'User' and 'Profile' in this module in mongodb database */
  imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{ name:'Profile',schema:profileSchema}],"mongodb"),],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
