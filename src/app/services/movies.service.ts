import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './../models/movies.model'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<[Movie]> {
    return this.http.get<[Movie]>('https://super-rest.herokuapp.com/test/daniel/');
  }
  getById(id: string): Observable<Movie> {
    return this.http.get<Movie>('https://super-rest.herokuapp.com/test/daniel/' + id);
  }

  save(data: Movie): Observable<any> {
    return this.http.post("https://super-rest.herokuapp.com/test/daniel/", data);
  }

  update(data: Movie, id: string): Observable<any> {
    return this.http.put('https://super-rest.herokuapp.com/test/daniel/' + id, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete('https://super-rest.herokuapp.com/test/daniel/' + id);
  }
}
