import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-instruction',
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatDivider
],
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit{
 qid:any;
 quiz:any;
  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _router:Router
  ) { }

  
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.qid = params['qid'];
    });

    this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
      // console.log(data);
      this.quiz = data;
    },
    (error) =>{
      console.log(error);
      alert("error in loading quiz instructions");
    });
  }

  startQuiz() {
    // Navigate to the quiz start page
 Swal.fire(
  {
    title: 'Are you sure?',
    text: "You won't be able to change your answers once you start!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, start the quiz!'
  }).then((result) => {
    if (result.isConfirmed) {
      this._router.navigate(['/start', this.qid]);
    }
  });
  }
 
  }


