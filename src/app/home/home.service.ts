import { Injectable } from '@angular/core';
import { Tracks } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class HomeService {



  constructor(private httpClient: HttpClient) { }

  // getTracks(): Observable<Tracks[]> {
  //     return this.httpClient.get<Tracks[]>('dev.musiclab.com/api/tracks')
  // }
}
