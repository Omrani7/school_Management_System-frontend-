import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule,FormGroup,FormControlName, FormControl } from '@angular/forms';
import { SchoolService } from '../school.service';
import { School } from '../school';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './school.component.html',
  styleUrl: './school.component.css'
})
export class SchoolComponent {
  viewForm : boolean = false ;
  schoolList : School[] | undefined;
  schoolId : number = 0;
  schoolService : SchoolService = inject(SchoolService);
  toggleForm(){
    this.viewForm = !this.viewForm;
  }
schoolInfos = new FormGroup({
  name : new FormControl(''),
  score : new FormControl('')
})
createSchool(){
  this.schoolService.createSchool(this.schoolInfos.value.name ?? '',
    this.schoolInfos.value.score ?? ''
  ).subscribe( {
    next : () => {
      console.log("school has been successfully created ")
    },
    error : (err) => {console.log("error occures",err)}
    ,
    complete : () => {
      console.log("school creation completed ")
    }
  });
}
getSchool():void{
  this.schoolService.getSchools().subscribe ( (data )=>{
    this.schoolList = data;
    console.log("schoollist has returned");
}
  );
} deleteSchoolById(id:number):void{
  this.schoolService.deleteShool(id).subscribe({

    next:() =>{
      console.log("school deleted")
    },
    error : (err) => {
      console.log("error occurs",err)
    },
    complete : ()=> {
      console.log("deletion completed.")
    }
  })
}

}
