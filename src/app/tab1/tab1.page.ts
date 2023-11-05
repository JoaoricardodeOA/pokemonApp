import { Component } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon:string='';
  areaBusca:any={
    bairro : '',
    localidade : '',
    logradouro : '',
    uf:''
  };


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
    this.pokeApiService.getPokeApiService();
  }
}
