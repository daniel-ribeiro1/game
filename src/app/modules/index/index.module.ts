import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';


// Anguar Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// My Components
import { IndexComponent } from './index.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    // Angular Material
    MatButtonModule,
    MatIconModule,
    SharedModule
  ]
})
export class IndexModule { }
