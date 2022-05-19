import { EventEmitter, Injectable } from '@angular/core';

import { Progress } from '../../shared/components/progress-bar/progress-bar.component';
import { ActionsService } from './views/actions/actions.service';
import { NamesService } from './views/names/names.service';
import { PlacesService } from './views/places/places.service';

@Injectable({
    providedIn: 'root'
})

export class GameService {
    public onChangeProgress = new EventEmitter<{ progress: Progress }>();

    private _progress: Progress;

    constructor(
        private _namesService: NamesService,
        private _actionsService: ActionsService,
        private _placesService: PlacesService
    ) {
        this._progress = '0%';
    }

    setProgress(progress: Progress) {
        this._progress = progress;
        this.onChangeProgress.emit({ progress: this._progress });
    }   
    getProgress() {
        return this._progress;
    }

    reset() {
        this._namesService.reset();
        this._actionsService.reset();
        this._placesService.reset();
    }
}