import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMusics } from 'src/models/IMusics';

@Injectable({
    providedIn: 'root'
})
export class MusicService {
    private url = environment;

    constructor(private http: HttpClient) {}

    getMusicApi() {
        return this.http.get<IMusics[]>(`${this.url.api}musics`);
    }

    insertMusic(filter: IMusics) {
        return this.http.post<IMusics>(`${this.url.api}musics`, filter);
    }

    editMusic(filter: IMusics) {
        return this.http.put<IMusics>(`${this.url.api}musics/${filter.id}`, filter);
    }

    deleteMusic(id: number) {
        return this.http.delete<void>(`${this.url.api}musics/${id}`);
    }
}
