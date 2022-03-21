import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Premio } from '../../models/domain/premio';

@Injectable()
export class PremioService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<Premio[]> {
        return this.http.get<Premio[]>(`${API_CONFIG.baseUrl}/premios/find-all`);
    }
}