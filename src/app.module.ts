
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [
    //configmodule carga lo que tengo en EnvConfiguratio
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
      }),
    
    MongooseModule.forRoot(process.env.MONGODB || '',{
      dbName: 'ponkemondb'
    }), // Provide a default or handle undefined

    PokemonModule,

    CommonModule,

    SeedModule
  ],

})
export class AppModule {}
