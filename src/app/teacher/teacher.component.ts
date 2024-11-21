
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { TeacherResponseDTO } from '../TeacherResponseDto';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacher: TeacherResponseDTO | undefined;
  teachersList: TeacherResponseDTO[] | undefined;
  teacherId: number = 0;
  showForm: boolean = false;
  teacherService: TeacherService = inject(TeacherService);

  teacherInfos = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    subjectSpecialization: new FormControl(''),
    contactInformation: new FormControl(''),
    user: new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      age: new FormControl<number | null>(null),
      role: new FormControl('TEACHER')
    })
  });


  toggleForm() {
    this.showForm = !this.showForm;
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getAllTeachers().subscribe((data) => {
      this.teachersList = data;
    });
  }

  getTeacherById(id: number) {
    this.teacherService.getTeacherById(id).subscribe((data) => {
      this.teacher = data;
      this.teacherInfos.patchValue({
        userName: data.userName,
        email: data.email,
        subjectSpecialization: data.subjectSpecialization,
        contactInformation: data.contactInformation,
        user: {
          username: data.userName,
          email: data.email,
          age: 0,
          role: 'TEACHER'
        }
      });
    });
  }

  deleteTeacherById(id: number): void {
    this.teacherService.deleteTeacher(id).subscribe({
      next: () => {
        console.log(`Teacher with ID ${id} deleted successfully.`);
        this.loadTeachers();
      },
      error: (err) => {
        console.error('Error deleting teacher:', err);
      },
      complete: () => {
        console.log('Delete request completed');
      }
    });
  }

  createTeacher() {
    const teacherData = {
      userName: this.teacherInfos.value.userName ?? '',
      email: this.teacherInfos.value.email ?? '',
      subjectSpecialization: this.teacherInfos.value.subjectSpecialization ?? '',
      contactInformation: this.teacherInfos.value.contactInformation ?? '',
      user: {
        username: this.teacherInfos.value.user?.username ?? '',
        email: this.teacherInfos.value.user?.email ?? '',
        age: this.teacherInfos.value.user?.age ?? 0,
        role: this.teacherInfos.value.user?.role ?? 'TEACHER'
      }
    };

    this.teacherService.createTeacher(teacherData).subscribe({
      next: () => {
        console.log("Teacher has been successfully created");
        this.loadTeachers();
      },
      error: (err) => {
        console.error('Error creating teacher:', err);
      },
      complete: () => {
        console.log('Create request completed');
        this.resetForm();
      }
    });
  }
  updateTeacher() {
    const teacherData = {
      userName: this.teacherInfos.value.userName ?? '',
      email: this.teacherInfos.value.email ?? '',
      subjectSpecialization: this.teacherInfos.value.subjectSpecialization ?? '',
      contactInformation: this.teacherInfos.value.contactInformation ?? '',
      user: {
        username: this.teacherInfos.value.user?.username ?? '',
        email: this.teacherInfos.value.user?.email ?? '',
        age: this.teacherInfos.value.user?.age ?? 0,
        role: this.teacherInfos.value.user?.role ?? 'TEACHER'
      }
    };

    if (this.teacherId) {
      this.teacherService.updateTeacher(this.teacherId, teacherData).subscribe({
        next: () => {
          console.log("Teacher has been successfully updated");
          this.loadTeachers();
        },
        error: (err) => {
          console.error('Error updating teacher:', err);
        },
        complete: () => {
          console.log('Update request completed');
          this.resetForm();
        }
      });
    }
  }

  onSubmit() {
    if (this.teacherId) {
      this.updateTeacher();
    } else {
      this.createTeacher();
    }
  }

  resetForm() {
    this.teacherInfos.reset();
    this.showForm = false;
    this.teacher = undefined;
    this.teacherId = 0;
  }
}
