import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarbleButtonComponent } from './marble-button/marble-button.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [MarbleButtonComponent],
    imports: [CommonModule, HttpClientModule],
    exports: [MarbleButtonComponent]
})
export class MarbleButtonModule {}
