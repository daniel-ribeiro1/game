import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InputService } from './input.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() disable: boolean = false;

  @Output() onAdd = new EventEmitter();

  public input = new FormControl('');
  private _inputSubscription: Subscription;

  constructor(
    private _inputService: InputService
  ) {
    this._inputSubscription = this._inputService.onToggleDisable.subscribe(disable => {
      if(disable) {
        this.input.disable();
      } else {
        this.input.enable();
      }
    });
  }

  ngOnInit(): void {
    if(this.disable) {
      this.input.disable();
    }
  }

  ngOnDestroy(): void {
      this._inputSubscription.unsubscribe();
  }

  // Actions
  addValue() {
    if(!this.input.value) {
      return;
    }

    this.onAdd.emit({ value: this.input.value });
    
    this.input.setValue('');
  }

}
