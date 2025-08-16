import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserdashboardComponent } from './pages/user/userdashboard/userdashboard.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionComponent } from './pages/user/instruction/instruction.component';
import { StartComponent } from './pages/user/start/start.component';

export const routes: Routes = [
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch : 'full'
    },
     {
        path: '',
        component: HomeComponent,
          pathMatch : 'full'
    },
     {
        path: 'login',
        component: LoginComponent,
          pathMatch : 'full'
    },
     {
  path: 'admin',
  component: DashboardComponent,
   canActivate: [adminGuard],
  children: [
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path : '',
      component: WelcomeComponent
    },
     {
      path : 'categories',
      component: ViewCategoriesComponent
    },
     {
      path : 'add-category',
      component: AddCategoryComponent
    },
    {
      path : 'quizzes',
      component: ViewQuizzesComponent
    },
    {
      path : 'add-quiz',
      component: AddQuizComponent
    },
     {
      path : 'quiz/:qid',
      component: UpdateQuizComponent
    },
    {
      path : 'view-questions/:qid/:title',
      component: ViewQuizQuestionsComponent
    },{
      path : 'add-question/:qid/:title',
      component : AddQuestionComponent
    }
  ],
}
,
      {
        path: 'user-dashboard',
        component: UserdashboardComponent,
          canActivate: [normalGuard],
          children:[
            {
              path:':catId',
              component: LoadQuizComponent,
            },
            {
              path:'instruction/:qid',
              component: InstructionComponent
            },
 
          ]
    },
               {
              path:'start/:qid',
              component: StartComponent,
              canActivate: [normalGuard]
            },
    
];
