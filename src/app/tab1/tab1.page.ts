import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  areaBuscarPokemon:string='52011210';
  areaBusca:any={
    bairro : '',
    localidade : '',
    logradouro : '',
    uf:''
  };
  public pokemon:any={
    name:'bulbasaur',
    image:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
    abilities:'2',
    height:'7',
    weight:'69'
  
  }


  constructor(
    private pokeApiService:PokeApiService,
    private viaCEPService:ViaCEPService
  ){}
  ngOnInit(): void {
    this.buscarPokemon(this.areaBuscarPokemon)
  }

  
  async buscarPokemon(areaBuscarPokemon:string){
    this.viaCEPService.getViaCEPService(areaBuscarPokemon)
      .subscribe((value)=>{
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ', '+JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = ' - '+JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-'+JSON.parse(JSON.stringify(value))['uf'];
      }); 
      let service =  await this.pokeApiService.getPokeApiService()
      service
      .subscribe(value=>{
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemon.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.image = JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default;
        this.pokeApiService.lastPokemonAbility = JSON.parse(JSON.stringify(value))['abilities'].length;
        console.log(JSON.parse(JSON.stringify(value))['abilities'].length)
      });
      console.log(this.pokeApiService.lastPokemonAbility)
      this.pokeApiService.lastPokemonAbility = this.pokemon.abilities
      
      console.log(this.pokeApiService.lastPokemonAbility)
  }
}
