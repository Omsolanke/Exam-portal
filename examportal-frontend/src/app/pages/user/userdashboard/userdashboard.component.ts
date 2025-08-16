import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserSidebarComponent } from "../user-sidebar/user-sidebar.component";
@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [RouterModule, UserSidebarComponent],
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {

}
