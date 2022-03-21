import { StorageService } from './../storage.service';
import { LocalUser } from './../../models/local_user';
import { CredenciaisDTO } from './../../models/credenciais.model';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: HttpClient, private storageService: StorageService) { }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    loginSucess(authorizationValue: string) {
        let token = authorizationValue.substring(7);
        let user: LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        };
        this.storageService.setLocalUser(user);
    }

    logout() {
        this.storageService.removeLocalUser();
    }

}