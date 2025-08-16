import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatList } from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule,MatListModule,RouterModule],
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [
    { cid: 1, title: 'Programming', description: 'Explore coding questions and challenges.' },
    { cid: 2, title: 'GK', description: 'General knowledge quizzes to improve awareness.' },
    { cid: 3, title: 'Practice', description: 'Practice sets for daily exam preparation.' }
  ];

  constructor( private category:CategoryService) {}

  ngOnInit(): void {
    this.category.categories().subscribe((data:any) => {
      //css
      this.categories = data;
      console.log(this.categories);
    },

    (error) => {
      //
      console.log(error);
      Swal.fire('Error !!','Error in loading data', 'error');
    }
  )
  };
}
