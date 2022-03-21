import { Aviso } from './../../models/domain/aviso';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AvisoService {

    constructor(public http: HttpClient) { }

    insert(obj: Aviso) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/avisos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

    findAll(): Observable<Aviso[]> {
        return this.http.get<Aviso[]>(`${API_CONFIG.baseUrl}/avisos/find-all`);
    }

    excluir(id: number) {
        return this.http.delete(`${API_CONFIG.baseUrl}/avisos/excluir/${id}`);
    }

    findOne(codigo: number): Observable<Aviso> {
        return this.http.get<Aviso>(`${API_CONFIG.baseUrl}/avisos/find-one/${codigo}`);
    }
}