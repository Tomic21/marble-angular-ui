import { NgModule } from '@angular/core';
import { MarbleComponent } from './marble.component';
import { MarbleButtonModule } from './modules/marble-button/marble-button.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [MarbleComponent],
    imports: [BrowserModule, MarbleButtonModule],
    exports: [MarbleComponent, MarbleButtonModule]
})
export class MarbleModule {}
