import { SolicitacaoRenovacao } from './../models/email/solicitacao-renovacao.model';
import { FaleConosco } from './../models/email/fale-conosco.model';
import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailService {

    constructor(public http: HttpClient) { }

    faleConosco(obj: FaleConosco) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/emails/fale-conosco`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

    renovacao(obj: SolicitacaoRenovacao) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/emails/renovacao`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }
}