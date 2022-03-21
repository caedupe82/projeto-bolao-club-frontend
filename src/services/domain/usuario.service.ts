import { Usuario } from './../../models/domain/usuario';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { EsqueceuSenha } from '../../models/esqueceu-senha';

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient) { }

    insert(obj: Usuario) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

    aceitarTermo(email: string) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios/aceitar-termo`,
            email,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

    usuarioPagou(email: string) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios/usuario-pagou`,
            email,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

    findAll(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${API_CONFIG.baseUrl}/usuarios/find-all`);
    }

    esqueceuSenha(obj: EsqueceuSenha) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios/esqueceu-senha`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }
}