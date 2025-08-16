import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Correct import
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn = false;
  user=null;

  // ✅ Inject Router here
  constructor(public login: LoginService, private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.login.loginStatus.subscribe((status) => {
      this.isLoggedIn = status;
        
    });

  }

  public logout() {
    this.login.logout();
    this.router.navigate(['/login']); // ✅ Works now
  }
}
