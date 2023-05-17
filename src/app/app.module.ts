import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarbleModule, MarbleButtonModule } from 'marble/src/public-api';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, MarbleButtonModule, MarbleModule.forRoot({ production: false })],
    bootstrap: [AppComponent]
})
export class AppModule {}
