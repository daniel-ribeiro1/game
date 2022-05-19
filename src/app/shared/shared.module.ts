import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TitleComponent } from './components/title/title.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    TitleComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // Angular Material
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TitleComponent,
    ProgressBarComponent
  ]
})
export class SharedModule { }
