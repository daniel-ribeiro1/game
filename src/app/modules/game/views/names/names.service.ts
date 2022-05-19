import { Injectable } from "@angular/core";
import { ItemInterface } from "../../components/viewer/item.interface";
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class NamesService {
    private _names: ItemInterface[];

    constructor() {
        this._names = [];
    }

    add(name: ItemInterface) {
        name.id = uuid.v4();

        this._names.unshift(name);
        this._save();
    }
    getAll() {
        this._refresh();

        return this._names;
    }
    delete(id: string | number) {
        this._names = this._names.filter(name => name.id != id);
        this._save();
    } 
    edit(item: ItemInterface) {
        if(!item.id) return; 

        const index = this._getIndexById(item.id);

        if(index < 0) return;

        this._names.splice(index, 1, item);
        this._save();
    }
    count() {
        this._refresh();
        
        return this._names.length;
    }
    getRandomNames() {
        return this._randomArray(this.getAll());
    }
    reset() {
        this._names = [];
        this._save();
    }

    private _save() {
        const names = JSON.stringify(this._names);
        localStorage.setItem('names', names);
    }
    private _refresh() {
        let storagedNames = localStorage.getItem('names');

        if(!storagedNames) return;

        const names: ItemInterface[] = JSON.parse(storagedNames);
        this._names = names;
    }
    private _getIndexById(id: string | number) {
        for(let index in this._names) {
            if(this._names[index].id == id) {
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