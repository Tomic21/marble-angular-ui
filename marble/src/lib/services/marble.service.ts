import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CONFIG } from '../interfaces/config.interface';
import { switchMap } from 'rxjs/operators';
import { Observable, Subject, forkJoin } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class MarbleService {
    public components: any = {};
    public production: boolean = false;

    public isLoaded: Subject<boolean> = new Subject();

    constructor(private apiService: ApiService, @Inject(CONFIG) private config: any) {
        this.production = this.config.production;

        const init: Observable<any> = this.production ? this.handleProductionInit() : this.handleDevelopmentInit();

        init.pipe(switchMap((componentsMap) => forkJoin(this.getJoinedCalls(componentsMap)))).subscribe(
            (components) => {
                this.components = components;
                this.isLoaded.next(true);
                console.log(this.components);
            }
        );
    }

    public handleProductionInit(): Observable<any> {
        return this.apiService.getRaw(`assets/marble/registered-components.json`);
    }

    public handleDevelopmentInit(): Observable<any> {
        return this.apiService.post([{ path: 'marble', value: 'init' }], {});
    }

    getJoinedCalls(componentsMap) {
        const joinedCalls: any = {};
        for (const key of Object.keys(componentsMap)) {
            joinedCalls[key] = this.fetchComponentData(key);
        }
        return joinedCalls;
    }

    private fetchComponentData(componentKey) {
        return this.apiService.getRaw(`assets/marble/${componentKey}.json`);
    }

    public registerComponent(componentKey) {
        return this.apiService.post([{ path: 'marble', value: 'register' }], { componentKey });
    }
}
