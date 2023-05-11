import { NgModule } from '@angular/core';
import { MarbleComponent } from './marble.component';
import { MarbleButtonModule } from './modules/marble-button/marble-button.module';



@NgModule({
  declarations: [
    MarbleComponent
  ],
  imports: [
    MarbleButtonModule
  ],
  exports: [
    MarbleComponent,
    MarbleButtonModule
  ]
})
export class MarbleModule { }
