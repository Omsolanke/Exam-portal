import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  imports: [ FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {

 constructor(private _route: ActivatedRoute, private _quiz:QuizService,
  private _cat: CategoryService,
  private _router :Router
 ){}

 qId = 0; 
 quiz:any;
categories:any;
  ngOnInit(): void {
   this.qId = this._route.snapshot.params['qid'];

    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any) =>{
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) =>{
        console.log(error);
      }
    );
    this._cat.categories().subscribe(
      (data: any) =>{
        this.categories = data;
      },
      (error) =>{
        alert('error in loading categories');
      }
    );

  }
  //update form submit
  public updateData(){
   // validation we can use here

   this._quiz.updateQuiz(this.quiz).subscribe((data) =>{
    Swal.fire('Sucess !!','quiz updated','success').then((e) =>{
      this._router.navigate(['/admin/quizzes']);
    });
   }, 
   (error) =>{
    Swal.fire('Error', 'error in updating quiz', 'error');
    console.log(error);
   }
  )
  }

}
