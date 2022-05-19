import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-navigate-buttons',
  templateUrl: './navigate-buttons.component.html',
  styleUrls: ['./navigate-buttons.component.scss']
})
export class NavigateButtonsComponent implements OnInit {
  @Input() previusPage!: string;
  @Input() nextPage!: string;
  @Input('restartGame') canRestartGame!: boolean;

  constructor(
    private _gameService: GameService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  restart() {
    if(this.canRestartGame) {
      this._gameService.reset();
      this._router.navigate(['/play/names']);
    }
  }

}
