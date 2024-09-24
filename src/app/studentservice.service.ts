import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';
import { login } from '../../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

  constructor(private http : HttpClient) { }
   apiUrl  =  "http://localhost:8080/students";

   getAllStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.apiUrl);
   }
getStudentByName( name : String):Observable<Student[]>{
  return this.http.get<Student[]>(`${this.apiUrl}/search/${name}`);
}
deleteStudentById(id : Number):Observable<void> {
 return this.http.delete<void>(`${this.apiUrl}/${id}`)

}
createStudent(firstName:String ,lastName:String,email:String,schoolId :number):Observable<Student>{
  const studentData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    schoolId: schoolId}
return this.http.post<Student>(this.apiUrl,studentData);


}}
