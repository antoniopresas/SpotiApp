import { SpotifyService } from './../../services/spotify.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nuevasCanciones: any[] = [];

  loading: boolean;

  error: boolean;

  mensajeError: string;

  constructor(
    private spoty: SpotifyService
  ) {

    this.loading = true;
    this.error = false;

    this.spoty.getNewReleases()
        .subscribe( (data: any) => {
          this.nuevasCanciones = data;
          this.loading = false;
        }, (errorService) => {
          this.error = true;
          this.loading = false;
          this.mensajeError = errorService.error.error.message;
        });
   }



}
