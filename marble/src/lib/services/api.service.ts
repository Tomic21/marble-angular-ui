import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestPath, RequestQuery } from '../interfaces/api.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {}

    requestBuilder(parameters: (RequestPath | RequestQuery)[]) {
        const pathParameters: any = parameters.filter((param: any) => param.path);
        const queryParameters: any = parameters.filter((param: any) => param.query);

        let url: string = 'http://localhost:9000/';

        pathParameters.forEach((pathParameter, i) => {
            const start = '';
            const endSlash = i !== pathParameters.length - 1 ? '/' : '';

            url += pathParameter.value
                ? `${start}${pathParameter.path}/${pathParameter.value}${endSlash}`
                : `${start}${pathParameter.path}${endSlash}`;
        });

        let params: HttpParams = new HttpParams();
        queryParameters.forEach((queryParameter) => {
            params = params.append(queryParameter.query, queryParameter.value);
        });

        return { url, params };
    }

    get(parameters: (RequestPath | RequestQuery)[]): Observable<any> {
        const { url, params } = this.requestBuilder(parameters);
        return this.http.get(url, { params });
    }

    getRaw(path: string): Observable<any> {
        return this.http.get(path);
    }

    post(parameters: (RequestPath | RequestQuery)[], body: any): Observable<any> {
        const { url, params } = this.requestBuilder(parameters);
        return this.http.post(url, body, { params });
    }
}
