import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';
@Component({
  selector: 'app-add-question',
  imports: [CommonModule,FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  MatStepperModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {


qId: any;
qTitle : any;
question  : any= {
  quiz:{
  },
  content : '',
  option1: '',
  option2 : '',
  option3 : '',
  option4 : '',
  answer : '',
};

 constructor(private _route : ActivatedRoute,
  private _question: QuestionService
 ){

 }


  ngOnInit(): void {
      this.qId = this._route.snapshot.params['qid'];
      this.qTitle = this._route.snapshot.params['title'];
      this.question.quiz['qId'] = this.qId;
  }
  
  formSubmit(){
   
    if(this.question.answer.trim() == '' || this.question.answer == null){
      return;
    }
    //form submit
     this._question.addQuestion(this.question).subscribe(
      (data:any) =>{
        Swal.fire('Sucess','Question Added','success');
        this.question.content=''
        this.question.option1 =''
        this.question.option2 =''
        this.question.option3 =''
        this.question.option4 =''
        this.question.answer = ''
      },
      (error) =>{
        Swal.fire('Error','error in data loading','error');
      }
     )
  }
}
