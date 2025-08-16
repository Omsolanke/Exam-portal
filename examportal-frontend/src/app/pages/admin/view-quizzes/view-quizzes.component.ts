import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-quizzes',
  standalone: true, // <--- REQUIRED if using imports[]
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css',
})
export class ViewQuizzesComponent implements OnInit {
  constructor(private quiz: QuizService) {}

  quizzes = [
    {
      qId: 2,
      title: 'Basic Java Quiz',
      description:
        'Core Java is an Object-Oriented language. It is widely used in every country',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        title: 'Programming',
      },
    },
    {
      qId: 3,
      title: 'Basic Python Quiz',
      description: 'In today’s world of AI, Python is a popular language.',
      maxMarks: '100',
      numberOfQuestions: '20',
      active: '',
      category: {
        title: 'Programming',
      },
    },
  ];

  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }
  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete...
        this.quiz.deleteQuiz(qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);
            Swal.fire('Sucess', 'Quiz deleted', 'success');
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !', 'Error in deleting quiz !', 'error');
          }
        );
      }
    });
  }
}
