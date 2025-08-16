# 📘 Exam Portal  

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7+-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-16+-red?logo=angular)](https://angular.io/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-blue?logo=mysql)](https://www.mysql.com/)
[![Build](https://img.shields.io/badge/Build-Maven-orange?logo=apache-maven)](https://maven.apache.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An **Online Exam Portal** built with **Spring Boot** (backend) and **Angular** (frontend).  
This project allows **students** to take quizzes/exams online and enables **admins** to manage quizzes, categories, and results with ease.  

---

## 🚀 Features  

### 👨‍🎓 Student Features  
- Register & login securely (JWT authentication).  
- Take quizzes based on categories.  
- Instant result evaluation.  
- View past exam history.  

### 👨‍💻 Admin Features  
- Add, update, and delete quizzes.  
- Manage categories and questions.  
- View all student results.  
- Role-based access (Admin / User).  

---

## 🛠 Tech Stack  

### Backend (Spring Boot - `examserver`)  
- **Spring Boot** (REST APIs)  
- **Spring Security + JWT** (Authentication & Authorization)  
- **Hibernate + JPA** (Database ORM)  
- **MySQL** (Database)  

### Frontend (Angular - `examportal-frontend`)  
- **Angular 16+**  
- **Angular Material** (UI components)  
- **RxJS** for state management  
- **Bootstrap** for styling  

---

## 📂 Project Structure  

```
Exam-portal/
│
├── examportal-frontend/    # Angular frontend
│   ├── src/                # Angular source code
│   ├── package.json
│   └── angular.json
│
├── examserver/             # Spring Boot backend
│   ├── src/main/java       # Backend source code
│   ├── src/main/resources  # Application properties
│   └── pom.xml
│
└── README.md
```

---

## ⚡ Getting Started  

### 🔧 Backend Setup (`examserver`)  
1. Open in **IntelliJ / Eclipse / VS Code**.  
2. Configure **MySQL** database in `application.properties`:  
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/examportal
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```
3. Run:
   ```bash
   mvn spring-boot:run
   ```
4. Backend will start at 👉 `http://localhost:8080`

---

### 🎨 Frontend Setup (`examportal-frontend`)  
1. Navigate to frontend folder:  
   ```bash
   cd examportal-frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Run the Angular app:  
   ```bash
   ng serve
   ```
4. Open 👉 `http://localhost:4200`

---

## 🔐 Authentication & Roles  
- **JWT Authentication** is implemented for secure login.  
- **Roles**:  
  - **Admin** → Full access (manage quizzes, users).  
  - **User** → Attempt quizzes, view results.  

---

## 📸 Screenshots  

> (Add screenshots here – e.g., login page, quiz attempt, admin dashboard)

---

## 🏗 Future Enhancements  
- Leaderboard for top scorers.  
- Email notifications for results.  
- Timed exams with auto-submit.  
- Export results as PDF.  

---

## 🤝 Contributing  
Contributions are welcome! Please fork the repository and create a pull request for any feature or bugfix.  

---

## 📜 License  
This project is licensed under the **MIT License** – feel free to use and modify.  

---

✨ **Developed by Sitaram Sharad Solanke** ✨  
