import { Inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CONFIG } from '../interfaces/config.interface';
import { switchMap } from 'rxjs/operators';
import { Observable, Subject, forkJoin, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MarbleService {
    public components: any = {};
    public production: boolean = false;

    public isLoaded: Subject<boolean> = new Subject();

    constructor(private apiService: ApiService, @Inject(CONFIG) private config: any) {
        this.production = this.config.production;
        this.apiService.production = this.config.production;

        const init: Observable<any> = this.production ? this.handleProductionInit() : this.handleDevelopmentInit();

        init.pipe(switchMap((componentsMap) => forkJoin(this.getJoinedCalls(componentsMap)))).subscribe(
            (components) => {
                this.components = components;
                this.isLoaded.next(true);
            }
        );
    }

    private handleProductionInit(): Observable<any> {
        return this.apiService.getRaw(`assets/marble/registered-components.json`);
    }

    private handleDevelopmentInit(): Observable<any> {
        return this.apiService.post([{ path: 'marble', value: 'init' }], {}).pipe();
    }

    private getJoinedCalls(componentsMap) {
        const joinedCalls: any = {};
        for (const key of Object.keys(componentsMap)) {
            joinedCalls[key] = this.fetchComponentData(key);
        }
        return joinedCalls;
    }

    private fetchComponentData(componentKey) {
        return this.apiService.getRaw(`assets/marble/${componentKey}.json`);
    }

    public prepareComponent(componentKey, uniqueKey): Observable<any> {
        const preparationProcess: any = this.production ? of(true) : this.registerComponent(componentKey);

        return preparationProcess.pipe(
            switchMap(() => this.isLoaded),
            switchMap((isLoaded) => {
                if (!isLoaded) return null;
                let specification = this.components['MarbleButtonComponent'][uniqueKey];
                if (!specification) specification = {};
                return of(specification);
            })
        );
    }

    /* Development only */
    private registerComponent(componentKey) {
        return this.apiService.post([{ path: 'marble', value: 'register' }], { componentKey });
    }
}
