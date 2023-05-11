import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarbleButtonModule } from 'marble/src/lib/modules/marble-button/marble-button.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarbleButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
