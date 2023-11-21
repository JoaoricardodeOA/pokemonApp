import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  public pokemon:any={
    name:'',
    image:'',
    abilities:'',
    height:'',
    weight:''

  }
  public pokemon1:any ={
    name:'',
    image:'',
    vitorias:'0',
    empates:'0',
    derrotas:'0'

  }
  public pokemons:{ name:'',image:'',vitorias:0,empates:0
  ,derrotas:0}[]=[]



  constructor(private pokeApiService:PokeApiService) {}
  ngOnInit(): void {
    this.pokemon1.name = this.pokeApiService.pokemon.name
    this.pokemon1.image = this.pokeApiService.pokemon.image
    this.pokemon1.vitorias = this.pokeApiService.pokemon.vitorias
    this.pokemon1.empates = this.pokeApiService.pokemon.empates
    this.pokemon1.derrotas = this.pokeApiService.pokemon.derrotas
  }
  ionViewDidEnter(){
    this.pokemon1.name = this.pokeApiService.pokemon.name
    this.pokemon1.image = this.pokeApiService.pokemon.image
    this.pokemon1.vitorias = this.pokeApiService.pokemon.vitorias
    this.pokemon1.empates = this.pokeApiService.pokemon.empates
    this.pokemon1.derrotas = this.pokeApiService.pokemon.derrotas
    this.pokemons = this.pokeApiService.pokemons
  }
  buscarPokemon(){
    this.pokeApiService.getPokeApiService()
      .subscribe(value => {
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemon.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.image = JSON.parse(JSON.stringify(value))['sprites']['front_default'];
      });
  }


}
