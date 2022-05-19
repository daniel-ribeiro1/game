import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputService } from '../../components/input/input.service';
import { ItemInterface } from '../../components/viewer/item.interface';
import { GameService } from '../../game.service';
import { NamesService } from '../names/names.service';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, OnDestroy {
  public places: ItemInterface[];
  public numberOfNames: number;

  private _actionsSubscription: Subscription;

  constructor(
    private _gameService: GameService,
    private _namesService: NamesService,
    private _placesService: PlacesService,
    private _inputService: InputService
  ) { 
    this.places = [];
    this.numberOfNames = 0;

    this._actionsSubscription = this._placesService.onChange.subscribe(places => {
      this.places = places;
    });
  }

  ngOnInit(): void {
    this._gameService.setProgress('65%');
    this.updateAndLoadAllPlaces();

    this.numberOfNames = this._namesService.count();

    if(this.isTheNumberOfPlacesLessThanToTheNumberOfNames()) {
      this._inputService.enable();
    } else {
      this._inputService.disable();
    }
  }

  ngOnDestroy(): void {
      this._actionsSubscription.unsubscribe();
  }

  isTheNumberOfPlacesLessThanToTheNumberOfNames() {
    return this._placesService.count() < this._namesService.count();
  }
  canGoToTheNextPage() {
    return this._placesService.count() == this._namesService.count();
  }

  // Actions
  addPlace(input: { value: string }) {
    if(!input.value || input.value == '') return;
    if(!this.isTheNumberOfPlacesLessThanToTheNumberOfNames()) return;

    this._placesService.add({value: input.value});

    if(!this.isTheNumberOfPlacesLessThanToTheNumberOfNames()) {
      this._inputService.disable();
    }
  }
  updateAndLoadAllPlaces() {
    this.places = this._placesService.getAll();
  }
  deletePlace(item: ItemInterface) {
    if(!item.id) return;

    this._placesService.delete(item.id);
    this.updateAndLoadAllPlaces();
    
    if(this.isTheNumberOfPlacesLessThanToTheNumberOfNames()) {
      this._inputService.enable();
    }
  }
  editPlace(item: ItemInterface) {
    if(!item.id) return;

    this._placesService.edit(item);
  }
}
