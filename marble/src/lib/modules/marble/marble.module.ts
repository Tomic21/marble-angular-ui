import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarbleService } from '../../services/marble.service';
import { CONFIG } from '../../interfaces/config.interface';

@NgModule({
    declarations: [],
    imports: [CommonModule]
})
export class MarbleModule {
    static forRoot(config?: any): any {
        return {
            ngModule: MarbleModule,
            providers: [MarbleService, { provide: CONFIG, useValue: config }]
        };
    }
}
