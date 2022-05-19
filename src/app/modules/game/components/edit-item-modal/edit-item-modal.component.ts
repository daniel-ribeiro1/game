import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemInterface } from '../viewer/item.interface';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {
  @Input() item: ItemInterface = { id: '', value: '' }

  @Output() onClose = new EventEmitter();
  @Output() onEdit = new EventEmitter<ItemInterface>();

  public input: FormControl;

  constructor() {
    this.input = new FormControl('');
  }

  ngOnInit(): void {
    this.input.setValue(this.item.value);
  }

  close() {
    this.onClose.emit();
  }

  edit() {
    if(this.input.value.length == 0) {
      return;
    }

    const newItem: ItemInterface = {
      id: this.item.id,
      value: this.input.value
    }

    this.onEdit.emit(newItem);
    this.close();
  }
}
