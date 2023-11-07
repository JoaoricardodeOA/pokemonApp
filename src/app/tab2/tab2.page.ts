import { Component } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pokemon:any={
    name:'bulbasaur',
    image:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
    abilities:'2',
    height:'7',
    weight:'69'
  
  }


  constructor(
    private pokeApiService:PokeApiService,
    public photoService:PhotoService
  ){
    this.buscarPokemon()
  }

  buscarPokemon(){
    this.pokeApiService.getPokeApiService()
      .subscribe((value)=>{
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemon.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.image = JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default;
      });
  }
  addPhotoToGallery(){
    this.photoService.addNewToGallery()
  }

}
