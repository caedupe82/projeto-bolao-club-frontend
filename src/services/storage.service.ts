import { STORAGE_KEYS } from './../config/storage_keys.config';
import { LocalUser } from './../models/local_user';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);

        if (user == null) {
            return null;
        }

        return JSON.parse(user);
    }

    public getEmail(): string {
        return this.getLocalUser().email.split('-')[0];
    }

    public getPermissao(): string {
        return this.getLocalUser().email.split('-')[1];
    }

    public getUsuarioPagou(): string {
        return this.getLocalUser().email.split('-')[2];
    }

    setLocalUser(obj : LocalUser) {

        if (obj == null) {
            this.removeLocalUser();
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    removeLocalUser() {
        localStorage.removeItem(STORAGE_KEYS.localUser);
    }
}