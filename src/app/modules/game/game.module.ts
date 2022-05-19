import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// My Components
import { GameComponent } from './game.component';
import { NamesComponent } from './views/names/names.component';
import { InputComponent } from './components/input/input.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { NavigateButtonsComponent } from './components/navigate-buttons/navigate-buttons.component';
import { EditItemModalComponent } from './components/edit-item-modal/edit-item-modal.component';
import { ActionsComponent } from './views/actions/actions.component';
import { PlacesComponent } from './views/places/places.component';
import { ResultComponent } from './views/result/result.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    GameComponent,
    NamesComponent,
    InputComponent,
    ViewerComponent,
    NavigateButtonsComponent,
    EditItemModalComponent,
    ActionsComponent,
    PlacesComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    // My Modules
    SharedModule
  ]
})
export class GameModule { }
