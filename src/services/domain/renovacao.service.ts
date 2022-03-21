import { RenovacaoList } from './../../models/list/renovacao-list';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RenovacaoService {

    constructor(public http: HttpClient) { }

    findAll(): Observable<RenovacaoList[]> {
        return this.http.get<RenovacaoList[]>(`${API_CONFIG.baseUrl}/renovacoes/find-all`);
    }

    aprovarOuReprovar(obj: RenovacaoList) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/renovacoes/aprovar-ou-reprovar`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }
}