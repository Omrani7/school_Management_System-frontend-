import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherResponseDTO } from './TeacherResponseDto';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'http://localhost:8080/teachers';

  constructor(private http: HttpClient) { }


  getAllTeachers(): Observable<TeacherResponseDTO[]> {
    return this.http.get<TeacherResponseDTO[]>(this.apiUrl);
  }


  getTeacherById(id: number): Observable<TeacherResponseDTO> {
    return this.http.get<TeacherResponseDTO>(`${this.apiUrl}/${id}`);
  }


  createTeacher(teacherData: any): Observable<TeacherResponseDTO> {
    return this.http.post<TeacherResponseDTO>(this.apiUrl, teacherData);
  }


  updateTeacher(id: number, teacherData: any): Observable<TeacherResponseDTO> {
    return this.http.put<TeacherResponseDTO>(`${this.apiUrl}/${id}`, teacherData);
  }


  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
