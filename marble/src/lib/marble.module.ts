import { NgModule } from '@angular/core';
import { MarbleComponent } from './marble.component';
import { MarbleButtonModule } from './modules/marble-button/marble-button.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [MarbleComponent],
    imports: [MarbleButtonModule, HttpClientModule],
    exports: [MarbleComponent, MarbleButtonModule]
})
export class MarbleModule {}
