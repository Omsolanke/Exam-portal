import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';

// Services
import { QuestionService } from '../../../services/question.service';

// Third-party
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatRadioModule,
  ],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit, OnDestroy {
  qid: any;
  questions: any[] = [];
  selectedOptions: { [key: number]: string } = {};
  score: number = 0;
  marksGot: number = 0;
  correctAnswers: number = 0;
  isSubmitted: boolean = false;
  quizStarted: boolean = false;
  progress: number = 0;

  // Timer
  timer: any;
  timeLeft: number = 0; // in seconds

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.paramMap.get('qid');
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  loadQuestions(): void {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error) => {
        Swal.fire('Error', 'Failed to load questions', 'error');
      }
    );
  }

  startQuiz() {
    this.quizStarted = true;
    this.timeLeft = this.questions.length * 2 * 60; // 2 min per question
    this.startTimer();
    this.updateProgress();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.submitQuiz();
      } else {
        this.timeLeft--;
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  }

  updateProgress() {
    const answered = Object.keys(this.selectedOptions).length;
    this.progress = Math.round((answered / this.questions.length) * 100);
  }

  getAttemptedCount(): number {
    return Object.keys(this.selectedOptions).length;
  }

  submitQuiz() {
    this.score = 0;
    this.correctAnswers = 0;
    this.isSubmitted = true;

    if (this.timer) {
      clearInterval(this.timer);
    }

    this.questions.forEach((q) => {
      if (this.selectedOptions[q.quesId] === q.answer) {
        this.correctAnswers++;
        this.score++;
      }
    });

    this.marksGot =
      this.score * (this.questions[0].quiz.maxMarks / this.questions.length);

    Swal.fire(
      'Quiz Submitted',
      `You got ${this.score} correct answers out of ${this.questions.length}. Marks: ${this.marksGot}`,
      'success'
    );
  }
printResult(){
  window.print();
}
}
