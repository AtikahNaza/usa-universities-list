import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITop10University, IUniversity } from '../university';

@Injectable({
  providedIn: 'root'
})
export class UniApiService {
  top10Url = '/assets/top10.json';

  constructor(private http: HttpClient) { }

  getUniversity(): Observable<IUniversity[]>{
    return this.http.get<IUniversity[]>("http://universities.hipolabs.com/search?country=United+States");
  }

  getTop10University(): Observable<ITop10University[]>{
    return this.http.get<ITop10University[]>(this.top10Url);
  }
}
