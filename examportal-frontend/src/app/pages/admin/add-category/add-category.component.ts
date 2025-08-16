import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent  implements OnInit{

 category = {
    title : '',
    description :'',
 };

 constructor(private _category:CategoryService,
              private _snack:MatSnackBar
 ){

 }

  ngOnInit(): void {
      
  }

  formSubmit(){
  if(this.category.title.trim() == '' || this.category.title == null){
   this._snack.open('Title Required !!','',{
    duration:3000,
   });
    return;
  } 
   
   //all done 
   this._category.addCategory(this.category).subscribe((data:any) =>{
    this.category.title=''
    this.category.description=''
    Swal.fire('Sucess !!','Category is added sucessfuly','success');
   },
   (error) =>{
    console.log(error);
        Swal.fire('Error !!','Server error !!','error');

   }
  );


  }
 
}
