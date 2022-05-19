import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../../modules/game/game.service';

export type Progress =  '0%' | '25%' | '45%' | '65%' | '100%';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})

export class ProgressBarComponent implements OnDestroy {
  @Input() progress: Progress = '25%';

  private progressSubscription: Subscription;

  constructor(
    private gameService: GameService
  ) {
    this.progressSubscription = this.gameService.onChangeProgress.subscribe(result => {
      if(!result.progress) return;

      this.progress = result.progress;
    });
  }

  ngOnDestroy():void {
    this.progressSubscription.unsubscribe();
  }

}
