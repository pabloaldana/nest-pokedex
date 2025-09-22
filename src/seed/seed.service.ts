import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {




  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>,
    private readonly http:AxiosAdapter
  ) {}


  //! METO MAS OPTIMO PARA INSERTAR MUCHOS REGISTROS
 async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data= await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon/?limit=250')

    const pokemonToInsert:{name:string, no:number}[]  = [];

    data.results.forEach(async ({name, url}) =>{
      const segments = url.split('/');
      const no = +segments [segments.length -2];

      // const pokemon = await this.pokemonModel.create({name,no})
      pokemonToInsert.push({name,no});
    })
    await this.pokemonModel.insertMany(pokemonToInsert);
    
    return 'Seed Executed';
  }
    // async executeSeed() {

  //   await this.pokemonModel.deleteMany({});

  //   const {data}= await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon/?limit=10')

  //   const insertPromisesArry: Promise<Pokemon>[] = [];

  //   data.results.forEach(async ({name, url}) =>{
  //     const segments = url.split('/');
  //     const no = +segments [segments.length -2];

  //     // const pokemon = await this.pokemonModel.create({name,no})
  //     insertPromisesArry.push(this.pokemonModel.create({name,no}))
  //   })
  //   await Promise.all(insertPromisesArry);

  //   return 'Seed Executed';
  // }
}
