import { Component, OnInit } from '@angular/core';
import { ItemInterface } from '../../components/viewer/item.interface';
import { GameService } from '../../game.service';
import { ActionsService } from '../actions/actions.service';
import { NamesService } from '../names/names.service';
import { PlacesService } from '../places/places.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  phrases: string[];

  constructor(
    private _gameService: GameService,
    private _namesService: NamesService,
    private _actionsService: ActionsService,
    private _placesService: PlacesService
  ) { 
    this.phrases = [];
  }

  ngOnInit(): void {
    this._gameService.setProgress('100%');

    const names = this._namesService.getRandomNames();
    const actions = this._actionsService.getRandomActions();
    const places = this._placesService.getRandomPlaces();
    const maxIndex = names.length;


    for(let i = 0; i < maxIndex; i++) {
      this.phrases.push(`${names[i].value } ${actions[i].value } ${places[i].value }`);
    }
  }

}
