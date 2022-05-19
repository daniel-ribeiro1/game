import { Injectable, EventEmitter} from "@angular/core";
import { ItemInterface } from "../../components/viewer/item.interface";
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class ActionsService {
    private _actions: ItemInterface[];
    public onChange: EventEmitter<ItemInterface[]>;

    constructor() {
        this._actions = [];
        this.onChange = new EventEmitter();
    }

    add(action: ItemInterface) {
        action.id = uuid.v4();

        this._actions.unshift(action);
        this._save();
    }
    getAll() {
        this._refresh();

        return this._actions;
    }
    delete(id: string | number) {
        this._actions = this._actions.filter(action => action.id != id);
        this._save();
    } 
    edit(item: ItemInterface) {
        if(!item.id) return; 

        const index = this._getIndexById(item.id);

        if(index < 0) return;

        this._actions.splice(index, 1, item);
        this._save();
    }
    count() {
        this._refresh();
        
        return this._actions.length;
    }
    getRandomActions() {
        return this._randomArray(this.getAll());
    }
    reset() {
        this._actions = [];
        this._save();
    }

    private _save() {
        const actions = JSON.stringify(this._actions);
        localStorage.setItem('actions', actions);

        this.onChange.emit(this._actions);
    }
    private _refresh() {
        let storagedactions = localStorage.getItem('actions');

        if(!storagedactions) return;

        const actions: ItemInterface[] = JSON.parse(storagedactions);
        this._actions = actions;
    }
    private _getIndexById(id: string | number) {
        for(let index in this._actions) {
            if(this._actions[index].id == id) {
                return Number(index);
            }
        }

        return -1;
    }
    private _randomArray(array: any[]) {
        const usedIds: number[] = [];
        const newArray: any[] = [];

        let id: number = 0;

        while(usedIds.length < array.length) {
            id = Math.floor(Math.random() * array.length);

            if(usedIds.includes(id)) {
                continue;
            }

            usedIds.push(id);
            newArray.push(array[id]);
        }

        return newArray;
    }
}