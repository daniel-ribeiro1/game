import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NamesService } from '../../views/names/names.service';
import { ItemInterface } from './item.interface';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  @Input() items: ItemInterface[] = [];
  @Input() minValue: number = 0;

  @Output() onDelete = new EventEmitter<ItemInterface>();
  @Output() onEdit = new EventEmitter<ItemInterface>();

  public editStatus: boolean;
  public input = new FormControl('');

  private itemToEdit: ItemInterface;

  constructor() { 
    this.editStatus = false;
    this.itemToEdit = {id: '', value: ''}
  }

  ngOnInit(): void {
  }
  // Input Actions
  setValue(value: string) {
    this.input.setValue(value);
  }

  // Actions
  deleteItem(item: ItemInterface) {
    if(!item.id) return;

    this.onDelete.emit(item);
  }

  setItemToEdit(item: ItemInterface) {
    this.editStatus = true;

    this.itemToEdit = item;
  }
  edit(item: ItemInterface) {
    if(!item.id) return;

    this.onEdit.emit(item);
  }


  getItemToEdit() {
    return this.itemToEdit;
  }
}
