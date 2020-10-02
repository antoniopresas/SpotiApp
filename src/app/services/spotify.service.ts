import { query } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private http: HttpClient
  ) {
    console.log('Spotify service listo');
  }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAjLqrA6dl759sQLFTYCSDQmFDk3vi0e8MuCov1sWENRaP-mEeFkLwLJ6fZ-GnwDN6J3DpJdSIknDRaW4w'
    });

    return this.http.get(url, {headers});

  }

  getNewReleases(){

    return this.getQuery('browse/new-releases')
                .pipe( map(data => data['albums'].items));

  }

  getArtistas(termino: string){

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => {
                  return data['artists'].items;
                }));

  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${id}`);
               // .pipe( map(data => data));
  }

  getTopTracks( id: string) {

    return this.getQuery(`artists/${id}/top-tracks?country=US`)
                .pipe( map(data => data['tracks']));

  }
}
