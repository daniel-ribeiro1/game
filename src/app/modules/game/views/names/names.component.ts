import { Component, OnInit } from '@angular/core';
import { ItemInterface } from '../../components/viewer/item.interface';
import { GameService } from '../../game.service';
import { NamesService } from './names.service';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit {
  public names: ItemInterface[];

  constructor(
    private gameService: GameService,
    private namesService: NamesService
  ) { 
    this.names = [];
  }

  ngOnInit(): void {
    this.updateAndLoadAllNames();
    this.gameService.setProgress('25%')
  }

  // Actions
  addName(input: { value: string }) {
    if(!input.value || input.value == '') return;

    this.namesService.add({value: input.value});
  }
  updateAndLoadAllNames() {
    this.names = this.namesService.getAll();
  }
  deleteName(item: ItemInterface) {
    if(!item.id) return;

    this.namesService.delete(item.id);
    this.updateAndLoadAllNames();
  }
  editName(item: ItemInterface) {
    if(!item.id) return;

    this.namesService.edit(item);
  }
}
