import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-load-quiz',
  imports: [CommonModule, MatCardModule,MatButtonModule,MatIconModule, MatDividerModule, RouterModule],
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent  implements OnInit{
 catId:any;
 quizzes:any;

  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService
  ){}

  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
this.catId = params['catId'];
if(this.catId ==0){
        console.log('Load all the quiz');
   
        this._quiz.getActiveQuizzes().subscribe((data:any)=>{
          this.quizzes = data;
          console.log(this.quizzes);
        },
      (error) =>{
        console.log(error);
        alert("error in loading all quizzes");
      });

      }else{
        console.log('Load Specific quiz');
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
          this.quizzes = data;
          console.log(this.quizzes);
        },
      (error) =>{
        console.log(error);
        alert("error in loading specific quizzes");
      });
      }
  }
    );
  
  }

      

}
