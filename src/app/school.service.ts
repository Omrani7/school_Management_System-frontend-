import { School } from './school';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
 apiUrl = 'http://localhost:8080/school';
  constructor( private http : HttpClient) { }
  createSchool( name :String , score :String):Observable<School >{
const schoolInfos ={
name: name,
 score : score
}
return this.http.post<School>(this.apiUrl,schoolInfos);

  }
  getSchools():Observable<School[]>{
    return this.http.get<School[]>(this.apiUrl);
}
deleteShool( id : number):Observable<void>{

  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}
