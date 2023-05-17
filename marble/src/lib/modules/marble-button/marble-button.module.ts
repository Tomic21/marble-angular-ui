import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MarbleButtonComponent } from './marble-button/marble-button.component';
@NgModule({
    declarations: [MarbleButtonComponent],
    imports: [CommonModule, HttpClientModule],
    exports: [MarbleButtonComponent]
})
export class MarbleButtonModule {}
