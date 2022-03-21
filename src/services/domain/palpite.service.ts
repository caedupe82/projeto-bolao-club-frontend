import { Palpite } from './../../models/domain/palpite';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Ranking } from '../../models/ranking.model';

@Injectable()
export class PalpiteService {

    constructor(public http: HttpClient) { }

    insert(obj: Palpite) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/palpites`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

    findOneByEmail(email: string) : Observable<Palpite> {
        return this.http.post(
            `${API_CONFIG.baseUrl}/palpites/find-one`,
            email);
    }

    findAllRankingByMesAndAno(): Observable<Ranking[]> {
        return this.http.get<Ranking[]>(`${API_CONFIG.baseUrl}/palpites/find-all-ranking-mes-ano`);
    }
}