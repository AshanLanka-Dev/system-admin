import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  baseUrl = environment.baseUrl + 'user-avatars'
  constructor(private _http:HttpClient) { }

  public getAvatar(userId:string):Observable<any>{
    return this._http.get(`${this.baseUrl}/${userId}`)
  }

  public createAvatar(file: File,userId: string): Observable<any> {
    const formData = new FormData();
    formData.append('userAvatar', file);

    return this._http.post(`${this.baseUrl}/${userId}`, formData);
  }

  public updateAvatar(file:File,userId:string):Observable<any>{
    const formData = new FormData();
    formData.append('userAvatar', file);

    return this._http.put(`${this.baseUrl}/${userId}`, formData);
  }

  public deleteAvatar(userId:string):Observable<any>{
    return this._http.delete(`${this.baseUrl}/${userId}`)
  }
}
