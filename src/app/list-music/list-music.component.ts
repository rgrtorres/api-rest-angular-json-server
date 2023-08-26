import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IMusics } from 'src/models/IMusics';
import { MusicService } from 'src/service/music.service';

@Component({
    selector: 'app-list-music',
    templateUrl: './list-music.component.html',
    styleUrls: ['./list-music.component.css']
})
export class ListMusicComponent {
    constructor(private musicService: MusicService) {
        this.getMusic();
    }

    musics$ = new Observable<IMusics[]>();

    //Forms
    idMusic: number = 0;
    nameMusic: string = "";
    authorMusic: string = "";

    getMusic() {
        this.musics$ = this.musicService.getMusicApi();
    }

    create() {
        if (!this.nameMusic || !this.authorMusic)
            return;

        this.musicService.insertMusic({ author: this.authorMusic, name: this.nameMusic }).subscribe(
            () => this.getMusic()
        )

        this.nameMusic = "";
        this.authorMusic = "";
    }

    loadData(music: IMusics) {
        this.idMusic = music.id as number;
        this.authorMusic = music.author;
        this.nameMusic = music.name;
    }

    edit() {
        this.musicService.editMusic(
            {
                id: this.idMusic,
                author: this.authorMusic,
                name: this.nameMusic
            }
        ).subscribe(
            () => this.getMusic()
        );

        this.idMusic = 0;
        this.nameMusic = "";
        this.authorMusic = "";
    }

    delete(id: number) {
        this.musicService.deleteMusic(id).subscribe(
            () => this.getMusic()
        )
    }
}
