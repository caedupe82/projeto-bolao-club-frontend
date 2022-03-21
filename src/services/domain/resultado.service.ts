import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Resultado } from '../../models/domain/resultado';

@Injectable()
export class ResultadoService {

    constructor(public http: HttpClient) { }

    insert(obj: Resultado) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/resultados`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

    findAllByMesAndAno(): Observable<Resultado[]> {
        return this.http.get<Resultado[]>(`${API_CONFIG.baseUrl}/resultados/find-all-mes-ano`);
    }
}