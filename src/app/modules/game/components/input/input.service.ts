import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class InputService {
    public onToggleDisable: EventEmitter<boolean>;
    private _disable: boolean;

    constructor() {
        this.onToggleDisable = new EventEmitter();
        this._disable = true;
    }
    disable() {
        this._disable = true;
        this.onToggleDisable.emit(this._disable);
    }

    enable() {
        this._disable = false;
        this.onToggleDisable.emit(this._disable);
    }
}