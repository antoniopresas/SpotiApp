import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista: any = {};

  topTracks: any = [];

  loading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotify: SpotifyService
  ) {
    this.activatedRoute.params.subscribe(params =>{
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
   }

  ngOnInit(): void {
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotify.getArtista(id)
        .subscribe( artista => {
          console.log(artista);
          this.artista = artista;
          this.loading = false;
        });
  }

  getTopTracks( id: string ) {
    this.spotify.getTopTracks( id )
        .subscribe( toptracks =>{
            this.topTracks = toptracks;
            console.log(this.topTracks);
        });
  }

}
