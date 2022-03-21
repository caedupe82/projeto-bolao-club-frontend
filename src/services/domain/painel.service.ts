import { PainelUsuario } from './../../models/domain/painel-usuario';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Painel } from '../../models/domain/painel';

@Injectable()
export class PainelService {

    constructor(public http: HttpClient) { }

    insert(obj: Painel) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/paineis`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

    findOne(): Observable<Painel> {
        return this.http.get<Painel>(`${API_CONFIG.baseUrl}/paineis/find-one`);
    }

    findOnePainelUsuario(): Observable<PainelUsuario> {
        return this.http.get<PainelUsuario>(`${API_CONFIG.baseUrl}/paineis/find-one-painel-usuario`);
    }

    findOnePainelPorData(data: string) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/paineis/selecionar-painel`,
            data,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}