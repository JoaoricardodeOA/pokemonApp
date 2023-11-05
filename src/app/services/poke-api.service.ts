import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  id: number = 0;
  constructor(private httpClient:HttpClient) { }
  getPokeApiService(){
    this.id= Math.floor(Math.random() * 100)
    if(this.id==0){
      this.id = 1;
    }
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
  }
}
