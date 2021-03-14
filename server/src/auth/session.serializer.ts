// src/auth/session.serializer.ts
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  
    serializeUser(user: any, done: (err: Error, user: any) => void): any {
    
    //serialize user and save it to session
    //console.log("user",user);
    done(null, user);
  }
  
  deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {

    //deserialize to retrieve user from session 
    //console.log("payload",payload);
    done(null, payload);
  }


}