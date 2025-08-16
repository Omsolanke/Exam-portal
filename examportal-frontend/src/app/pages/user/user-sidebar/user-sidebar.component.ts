import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-sidebar',
  imports: [MatCardModule, MatListModule, MatIconModule,CommonModule,RouterModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent implements OnInit {
 categories:any;
 constructor(private _cat:CategoryService,
  private _snack:MatSnackBar
 ){
 }

  ngOnInit(): void {
      this._cat.categories().subscribe(
        (data:any) =>{
          this.categories = data;
        },
        (error) =>{
          this._snack.open('Error in loading categories from server','',{
            duration :3000,
          });
        }
      )
  }

}
