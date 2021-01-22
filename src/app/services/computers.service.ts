import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from '../models/compute.model';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {

  constructor(private readonly http: HttpClient) { }

  getComputers(): Observable<[Computer]> {
    return this.http.get<[Computer]>('https://super-rest.herokuapp.com/test/daniel/');
  }

  saveComputer(data: Computer): Observable<any> {
    return this.http.post("https://super-rest.herokuapp.com/test/daniel/", data);
  }

  updateComputer(data: Computer, id: string): Observable<any> {
    return this.http.put('https://super-rest.herokuapp.com/test/daniel/' + id, data);
  }

  deleteComputer(id: string): Observable<any> {
    return this.http.delete('https://super-rest.herokuapp.com/test/daniel/' + id);
  }

}
