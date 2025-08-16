import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // ✅ Required for mat-option
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: true, // ✅ REQUIRED
  imports: [
    CommonModule,
    FormsModule,            // ✅ REQUIRED for [(ngModel)]
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,        // ✅ REQUIRED for [ngValue] on <mat-option>
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {
  categories = [
    { cid: 1, title: 'Programming' },
    { cid: 2, title: 'Mathematics' }
  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: null,
  };

  constructor(private _cat: CategoryService, private _snack :MatSnackBar, private _quiz : QuizService) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error(error);
        Swal.fire('Error!', 'Failed to load categories', 'error');
      }
    );
  }

  //addquiz 
addQuiz(){
  if(this.quizData.title.trim() == '' || this.quizData.title == null){
    this._snack.open('Title Required !!','',{
      duration : 3000,
    });
    return;
  }

  // validation....

  //call server

  this._quiz.addQuiz(this.quizData).subscribe(
    (data)=>{
      Swal.fire('Success','quiz is added', 'success')
      this.quizData = {
        title: '',
       description: '',
       maxMarks: '',
      numberOfQuestions: '',
      active: true,
      category: null,
      }
    },
    (error) =>{
      Swal.fire('Error !!', 'Error while adding quiz','error');
      console.log(error);
    }
  )

}
}
