import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiGroupService {

  private baseUrl = '$api-group';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  public save(apiGroup: any): Observable<any> {
    return this.http.post(this.baseUrl, apiGroup);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  public getAppPermission(groupId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${groupId}/permissions`);
  }

  public updateAppPermission(groupId: string, permissionsStr: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/${groupId}/permissions`, permissionsStr);
  }
}
