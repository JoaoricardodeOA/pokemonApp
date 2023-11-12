import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';
import { Tab1Page } from '../tab1/tab1.page';
import { delay } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  pokemonAdversary:any={
    name:'',
    image:'',
    abilities:'',
    height:'',
    weight:''
  
  }
  resultado:string = '' 
  

  constructor(
    private pokeApiService:PokeApiService,
    public photoService:PhotoService
  ){
    
  }
  ngOnInit(): void {
    this.buscarPokemon()
    this.setResultado()
  }

  async buscarPokemon(){
    let service =  await this.pokeApiService.getPokeApiService()
     service
      .subscribe(value =>{
        this.pokemonAdversary.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemonAdversary.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemonAdversary.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemonAdversary.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemonAdversary.image = JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default;
        this.pokeApiService.adversaryAbility = JSON.parse(JSON.stringify(value))['abilities'].length;  
        console.log(JSON.parse(JSON.stringify(value))['abilities'].length)
      });
      console.log(this.pokeApiService.lastPokemonAbility)
      this.pokeApiService.lastPokemonAbility = this.pokemonAdversary.abilities
      
      console.log(this.pokeApiService.lastPokemonAbility)
  }
  addPhotoToGallery(){
    this.photoService.addNewToGallery()
  }
  setResultado(){
    console.log(this.pokeApiService.lastPokemonAbility)
    console.log(this.pokeApiService.adversaryAbility)
     if(this.pokeApiService.adversaryAbility === this.pokeApiService.lastPokemonAbility){
        this.resultado = 'empatou'
     }else if(this.pokeApiService.adversaryAbility > this.pokeApiService.lastPokemonAbility){
        this.resultado = 'ganhou'
     }else{
      this.resultado = 'perdeu'
     }
  }

}
