import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page{
  areaBuscarPokemon:string='52011210';
  areaBusca:any={
    bairro : '',
    localidade : '',
    logradouro : '',
    uf:''
  };
  public pokemon:any={
    name:'',
    image:'',
    abilities:'',
    height:'',
    weight:''

  }

  constructor(
    private pokeApiService:PokeApiService,
    private viaCEPService:ViaCEPService
  ){}

  buscarPokemon(areaBuscarPokemon:string){
    this.viaCEPService.getViaCEPService(areaBuscarPokemon)
      .subscribe((value)=>{
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ', '+JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = ' - '+JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-'+JSON.parse(JSON.stringify(value))['uf'];
      });
      this.pokeApiService.getPokeApiService()
      .subscribe((value)=>{
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemon.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.image = JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default;
        //
        this.pokeApiService.lastPokemonAbility = this.pokemon.abilities;
      });
  }
}
