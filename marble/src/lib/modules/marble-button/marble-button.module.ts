import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarbleButtonComponent } from './marble-button/marble-button.component';

@NgModule({
    declarations: [MarbleButtonComponent],
    imports: [CommonModule],
    exports: [MarbleButtonComponent]
})
export class MarbleButtonModule {}
