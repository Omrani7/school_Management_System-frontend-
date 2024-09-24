import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Student } from './../student';
import { Component, inject, OnInit } from '@angular/core';
import { StudentserviceService } from '../studentservice.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent  implements OnInit{

student : Student | undefined;
studentsList : Student[] | undefined;
studentsByName:  Student[] | undefined;
studentId : number = 0;
showForm: boolean = false;
studentService : StudentserviceService = inject(StudentserviceService);
toggleForm() {
  this.showForm = !this.showForm;
}
loadStudents(){
 this.studentService.getAllStudents().subscribe((data) =>{
  this.studentsList = data;
 })
}
getStudentByName(name : String){
  this.studentService.getStudentByName(name).subscribe((data)=>{
this.studentsByName = data ;
console.log(this.studentsByName);
  })
}
studentName : string = '';
ngOnInit(): void {
}
deleteStudentById(id: number): void {
  this.studentService.deleteStudentById(id).subscribe({
    next: () => {
      console.log(`Student with ID ${id} deleted successfully.`);

    },
    error: (err) => {
      console.error('Error deleting student:', err);
    },
    complete: () => {
      console.log('Delete request completed');
    }
  });
}


studentInfos = new FormGroup({
  firstName : new FormControl(''),
  lastName: new FormControl(''),
email: new FormControl(''),
schoolId: new FormControl('')}
)
createStudent() {
  this.studentService.createStudent(
    this.studentInfos.value.firstName ?? '',
    this.studentInfos.value.lastName ?? '',
    this.studentInfos.value.email ?? '',
    +(this.studentInfos.value.schoolId ?? 0)
  ).subscribe({
    next: () => {
      console.log("Student has been successfully created");
    },
    error: (err) => {
      console.error('Error creating student:', err);
    },
    complete: () => {
      console.log('Create request completed');
    }
  });
}

}
