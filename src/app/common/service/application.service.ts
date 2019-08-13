import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = '$applications';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  public add(application: any): Observable<any> {
    return this.http.post(this.baseUrl, application);
  }

  public update(application: any): Observable<any> {
    return this.http.put(this.baseUrl, application);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
