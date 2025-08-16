import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCard } from "@angular/material/card";
import { MatCardContent } from "@angular/material/card";
import { MatCardActions } from "@angular/material/card";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCard, MatCardContent, MatCardActions,MatButtonModule,MatCardModule], // optional: add more if needed
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // <- fix here
})
export class ProfileComponent implements OnInit{
 user:any= null;
 constructor(private login:LoginService){}
  ngOnInit(): void {
      this.user =this.login.getUser();
  }
}

