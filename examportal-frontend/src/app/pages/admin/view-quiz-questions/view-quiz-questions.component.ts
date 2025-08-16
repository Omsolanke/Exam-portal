import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  imports: [CommonModule,MatCardModule,MatIconModule, MatButtonModule,RouterModule],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent  implements OnInit{

 qId:any;
 qTitle: any;
 questions: any[] = [];


   constructor( private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar

   ){}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle =this._route.snapshot.params['title'];
      this._question.getQuestionsOfQuiz(this.qId).subscribe(
        (data : any) =>{
          console.log(data);
          this.questions = data;
        }, (error) =>{
          console.log(error);
        }
      )
  }

  //  Delete Question function

  deleteQuestion(qid:any){
  Swal.fire({
    icon : 'info',
    showCancelButton: true,
    confirmButtonText:'Delete',
    title:'Are you sure , want to delete this question?'
  }).then((result) =>{
    if(result.isConfirmed){
      //confirm
      this._question.deleteQuestion(qid).subscribe((data) =>{
        this._snack.open('question Deleted','',{
          duration : 3000,
        });
        this.questions = this.questions.filter((q) => q.quesId !== qid)
      }, (error) =>{
        this._snack.open('Error in deleting questions', '',{
          duration : 3000,
        })
      })
    }
  })
  }

}
