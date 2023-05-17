import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CONFIG } from '../interfaces/config.interface';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class MarbleService {
    private componentsMap: any = {};
    public components: any = {};

    constructor(private apiService: ApiService, @Inject(CONFIG) private config: any) {
        if (!config.production) {
            this.init()
                .pipe(
                    switchMap((response) => {
                        this.componentsMap = response;
                        console.log('init:success');

                        const joinedCalls = {};
                        for (const key of Object.keys(this.componentsMap)) {
                            joinedCalls[key] = this.fetchComponentData(key);
                        }
                        return forkJoin(joinedCalls);
                    })
                )
                .subscribe((response) => {
                    console.log(response);
                    this.components = response;
                });
        }
    }

    public init() {
        return this.apiService.post([{ path: 'marble', value: 'init' }], {});
    }

    private fetchComponentData(componentKey) {
        return this.apiService.get([{ path: 'assets', value: 'marble' }, { path: `${componentKey}.json` }]);
    }

    public registerComponent(componentKey) {
        return this.apiService.post([{ path: 'marble', value: 'register' }], { componentKey });
    }
}
