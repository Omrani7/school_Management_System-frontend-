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
  firstname: new FormControl(''),
  lastname: new FormControl(''),
  schoolId: new FormControl(''),
  userInfos: new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(''),
    role: new FormControl('')
  })
});

createStudent() {
  const studentData = {
    firstname: this.studentInfos.value.firstname ?? '',
    lastname: this.studentInfos.value.lastname ?? '',
    schoolId: this.studentInfos.value.schoolId ?? 0,
    userdto: {
      username: this.studentInfos.value.userInfos?.username ?? '',
      email: this.studentInfos.value.userInfos?.email ?? '',
      age: this.studentInfos.value.userInfos?.age ?? 0,
      role: this.studentInfos.value.userInfos?.role ?? ''
    }
  };

  this.studentService.createStudent(studentData).subscribe({
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
