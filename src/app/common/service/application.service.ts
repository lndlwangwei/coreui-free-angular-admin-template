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

  public save(application: any): Observable<any> {
    return this.http.post(this.baseUrl, application);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  public getAppPermission(appId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${appId}/permissions`);
  }

  public updateAppPermission(appId: string, permissionsStr: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/${appId}/permissions`, permissionsStr);
  }
}
