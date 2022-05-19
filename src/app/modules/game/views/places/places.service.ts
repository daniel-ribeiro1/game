import { Injectable, EventEmitter } from "@angular/core";
import { ItemInterface } from "../../components/viewer/item.interface";
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class PlacesService {
    private _places: ItemInterface[];
    public onChange: EventEmitter<ItemInterface[]>;

    constructor() {
        this._places = [];
        this.onChange = new EventEmitter();
    }

    add(place: ItemInterface) {
        place.id = uuid.v4();

        this._places.unshift(place);
        this._save();
    }
    getAll() {
        this._refresh();

        return this._places;
    }
    delete(id: string | number) {
        this._places = this._places.filter(place => place.id != id);
        this._save();
    } 
    edit(item: ItemInterface) {
        if(!item.id) return; 

        const index = this._getIndexById(item.id);

        if(index < 0) return;

        this._places.splice(index, 1, item);
        this._save();
    }
    count() {
        this._refresh();
        
        return this._places.length;
    }
    getRandomPlaces() {
        return this._randomArray(this.getAll());
    }
    reset() {
        this._places = [];
        this._save();
    }

    private _save() {
        const places = JSON.stringify(this._places);
        localStorage.setItem('places', places);

        this.onChange.emit(this._places);
    }
    private _refresh() {
        let storagedplaces = localStorage.getItem('places');

        if(!storagedplaces) return;

        const places: ItemInterface[] = JSON.parse(storagedplaces);
        this._places = places;
    }
    private _getIndexById(id: string | number) {
        for(let index in this._places) {
            if(this._places[index].id == id) {
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