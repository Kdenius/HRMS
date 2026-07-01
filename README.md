# 🚀 Human Resource Management System (HRMS)

A web-based Human Resource Management System (HRMS) designed to streamline and automate workforce operations, including employee management, travel and expense tracking, employee engagement, game scheduling, organizational hierarchy visualization, and recruitment workflows.

---

## 📌 Modules

### 👥 Master Data Management

- Employee Profile Management
- Role & Permission Management
- Department Configuration

### ✈️ Travel & Expense Management

- Travel Plan Creation & Assignment
- Travel Document Management
- Expense Submission & Validation
- Expense Approval Workflow
- Reimbursement Tracking

### 🎉 Social Engagement

- Achievement Posts
- Likes & Comments
- Birthday & Work Anniversary Celebrations
- Content Moderation

### 🎮 Games Scheduling System

- Game Slot Booking
- Queue-Based Fair Scheduling
- Weekly Participation Reset
- Slot Reallocation

### 🏢 Organization Chart

- Organizational Hierarchy Visualization
- Managerial Chain Tracking
- Direct Report Management

### 💼 Recruitment & Referral System

- Job Posting Management
- Job Sharing via Email
- Employee Referral System
- CV Upload & Tracking
- Referral Audit Logs

---

## 🛠️ Technology Stack

| Category          | Technologies                                  |
| ----------------- | --------------------------------------------- |
| Frontend          | React, Vite, TypeScript                       |
| UI                | Tailwind CSS                                  |
| Data Fetching     | TanStack Query                                |
| API Communication | Axios                                         |
| Backend           | Java 17, Spring Boot                          |
| Security          | Spring Security, JWT Authentication           |
| Database          | Microsoft SQL Server                          |
| Storage           | Local Storage, Azure Blob Storage, Cloudinary |
| Email Service     | Spring Mail                                   |
| Real-Time Updates | WebSocket                                     |
| Build Tool        | Gradle                                        |
| Version Control   | Git & GitHub                                  |

---

## ⚙️ Prerequisites

- Java 17+
- Node.js 18+
- SQL Server
- Git

---

## 📥 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Kdenius/HRMS.git
```

### 2️⃣ Backend Setup

Navigate to the backend project:

```bash
cd hrms-api/hrms
```

Configure:

```text
src/main/resources/application.properties
```

Run the application:

**Windows**

```bash
gradlew.bat bootRun
```

**Linux / macOS**

```bash
./gradlew bootRun
```

Or Easily from any IDE like : `Eclipse` or `Intellij Idea`

Backend URL:

```text
http://localhost:8080
```

---

### 3️⃣ Frontend Setup

Navigate to the frontend project:

```bash
cd hrms-ui
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔧 Configuration

### Database

```properties
spring.datasource.url=jdbc:sqlserver://localhost;databaseName=hrms_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### JWT

```properties
jwt.secret=your_jwt_secret
jwt.expiry=60
```

### Mail

```properties
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

### Frontend URL

```properties
frontend.url=http://localhost:5173
```

### Spring Profiles

Select the storage provider and mail service using Spring Profiles:

```properties
spring.profiles.active=storage-local,mail-smtp
```

#### Available Storage Profiles

| Profile              | Description                       |
| -------------------- | --------------------------------- |
| `storage-local`      | Store files on the local server   |
| `storage-aws`        | Store files in AWS S3             |
| `storage-azure`      | Store files in Azure Blob Storage |
| `storage-cloudinary` | Store files in Cloudinary         |

#### Available Mail Profiles

| Profile     | Description                          |
| ----------- | ------------------------------------ |
| `mail-smtp` | Send emails using SMTP configuration |

---

## 📚 Documentation

- 📌 [Requirement Documentation](./docs/HRMS_Feature_Requirment.pdf)
- 📕 [Project Report](./docs/HRMS_Report.pdf)
- 📊 [Presentation](./docs/HRMS_PPT.pptx)

---

## 📄 License

This project was developed as part of an internship program for learning and demonstration purposes.

© 2026 HRMS Project — Kishan Dervaliya
