import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';

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
  ){ }
  ngOnInit(): void {
    this.buscarPokemon()
  }

  buscarPokemon(){
    this.pokeApiService.getPokeApiService()
      .subscribe(value => {
        this.pokemonAdversary.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemonAdversary.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemonAdversary.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemonAdversary.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemonAdversary.image = JSON.parse(JSON.stringify(value))['sprites'].other.dream_world.front_default;
        //
        this.pokeApiService.adversaryAbility = this.pokemonAdversary.abilities;
        console.log(this.pokeApiService.lastPokemonAbility)
        console.log(this.pokeApiService.adversaryAbility)
        this.setResultado();
      });
  }

  addPhotoToGallery(){
    this.photoService.addNewToGallery()
  }

  setResultado(){
     if(this.pokeApiService.adversaryAbility === this.pokeApiService.lastPokemonAbility){
        this.resultado = 'Empatou'
     }else if(this.pokeApiService.adversaryAbility > this.pokeApiService.lastPokemonAbility){
        this.resultado = 'Ganhou'
     }else{
      this.resultado = 'Perdeu'
     }
  }

}
