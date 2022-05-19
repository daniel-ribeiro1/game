import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputService } from '../../components/input/input.service';
import { ItemInterface } from '../../components/viewer/item.interface';
import { GameService } from '../../game.service';
import { NamesService } from '../names/names.service';
import { ActionsService } from './actions.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit, OnDestroy {
  public actions: ItemInterface[];
  public numberOfActions: number;
  public numberOfNames: number;

  private _actionsServiceSubscription: Subscription;

  constructor(
    private _gameService: GameService,
    private _namesService: NamesService,
    private _actionsService: ActionsService,
    private _inputService: InputService
  ) { 
    this.actions = [];
    this.numberOfNames = 0;
    this.numberOfActions = 0;

    this._actionsServiceSubscription = this._actionsService.onChange.subscribe((actions) => {
      this.actions = actions;
    });
  }

  ngOnInit(): void {
    this._gameService.setProgress('45%');
    this.updateAndLoadAllActions();

    this.numberOfNames = this._namesService.count();
    this.numberOfActions = this._actionsService.count();
    
    if(this.isTheNumberOfActionsLessThanToTheNumberOfNames()) {
      this._inputService.enable();
    } else {
      this._inputService.disable();
    }
  }

  ngOnDestroy(): void {
      this._actionsServiceSubscription.unsubscribe();
  }

  isTheNumberOfActionsLessThanToTheNumberOfNames() {
    return this._actionsService.count() < this._namesService.count();
  }
  
  canGoToTheNextPage() {
    return this._actionsService.count() == this._namesService.count();
  }

  // Actions
  addAction(input: { value: string }) {
    if(!input.value || input.value == '') return;
    if(!this.isTheNumberOfActionsLessThanToTheNumberOfNames()) return; 

    this._actionsService.add({ value: input.value });

    if(!this.isTheNumberOfActionsLessThanToTheNumberOfNames()) {
      this._inputService.disable();
    } 
  }

  updateAndLoadAllActions() {
    this.actions = this._actionsService.getAll();
  }

  deleteAction(item: ItemInterface) {
    if(!item.id) return;

    this._actionsService.delete(item.id);
    this.updateAndLoadAllActions();
    
    if(this.isTheNumberOfActionsLessThanToTheNumberOfNames()) {
      this._inputService.enable();
    }
  }

  editAction(item: ItemInterface) {
    if(!item.id) return;

    this._actionsService.edit(item);
  }
}
