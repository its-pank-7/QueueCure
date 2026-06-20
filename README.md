# 🏥 QueueCure – AI-Powered Smart Hospital Queue Management System

![Hackathon](https://img.shields.io/badge/Hackathon-Queue%20Cure%20'26-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-black)
![Status](https://img.shields.io/badge/Status-Completed-success)

---

## 🚀 Project Overview

QueueCure is a real-time hospital queue management platform designed to eliminate traditional paper-token systems and modernize patient flow management in clinics and hospitals.

Built using **Node.js, Express.js, MongoDB Atlas, and Socket.IO**, QueueCure provides:

* Real-Time Queue Synchronization
* Dynamic Wait-Time Prediction
* Emergency Queue Prioritization
* Voice Announcements
* Analytics Dashboard
* PDF Reporting
* Historical Record Management

The platform improves transparency for patients, reduces receptionist workload, enhances doctor coordination, and delivers actionable operational insights for healthcare facilities.

---

# 🎯 Problem Statement

More than 76% of clinics still rely on manual queue systems, resulting in:

* Long waiting times
* No queue visibility
* Receptionist overload
* Unpredictable consultation schedules
* Poor patient experience
* Lack of operational analytics

QueueCure addresses these challenges through a fully digital, real-time queue management ecosystem.

---

# 💡 Solution

QueueCure transforms traditional queue management into an intelligent digital workflow:

Patient Registration
→ Smart Queue Allocation
→ Real-Time Synchronization
→ Doctor Consultation
→ Wait-Time Analytics
→ Voice Announcement
→ Live Display Updates
→ PDF Reports
→ Historical Archiving

---

# 🔗 Live Deployment

## 🌐 Frontend

https://queue-cure-465l.vercel.app/

## ⚙️ Backend API

https://queuecure-zrfx.onrender.com

---

# 🏆 Hackathon Submission Assets

| Asset                        | Status |
| ---------------------------- | ------ |
| Working Prototype            | ✅      |
| GitHub Repository            | ✅      |
| README Documentation         | ✅      |
| Socket Event Diagram         | ✅      |
| Thought Process Sheet        | ✅      |
| Real-Time Synchronization    | ✅      |
| Dynamic Wait-Time Prediction | ✅      |
| Analytics Engine             | ✅      |
| PDF Reporting                | ✅      |
| Archive System               | ✅      |

---

# ✨ Core Features

## 🏥 Receptionist Dashboard

* One-Click Patient Registration
* Auto Token Generation
* Queue Type Selection

  * Normal
  * Priority
  * Emergency
* Call Next Patient
* Skip Patient
* Queue Statistics
* Real-Time Synchronization
* Daily Archive System
* Duplicate Patient Prevention
* Form Validation

---

## 👨‍⚕️ Doctor Dashboard

* Current Patient Monitoring
* Complete Consultation
* Skip Consultation
* Live Queue Tracking
* Real-Time Updates

---

## 👤 Patient Portal

* Current Token Tracking
* Queue Position
* Tokens Ahead
* Estimated Wait Time
* Live Status Updates

---

## 📺 Live Display Screen

* Current Token Display
* Patient Information
* Doctor Information
* Waiting Queue Status
* Real-Time Updates

---

## 🔊 Voice Announcement System

Automated announcements:

"Token Number 125, Prathmesh Jadhav, please proceed to Doctor Cabin."

Designed to improve accessibility and reduce missed consultations.

---

## 📊 Analytics Dashboard

* Average Consultation Time
* Queue Statistics
* Efficiency Score
* Completion Rate
* Patient Throughput
* Wait-Time Analysis

---

## 📜 History Module

* Daily Archive Records
* Date-Based Search
* Historical Queue Tracking
* Operational Insights

---

## 📄 PDF Reporting

* Daily Queue Reports
* Consultation Statistics
* Patient Summaries
* Downloadable PDF Exports

---

# 📡 Real-Time Socket.IO Events

| Event                 | Description               |
| --------------------- | ------------------------- |
| patientAdded          | New patient registered    |
| queueUpdated          | Queue updated instantly   |
| patientCalled         | Next token called         |
| consultationCompleted | Consultation finished     |
| patientSkipped        | Patient skipped           |
| analyticsUpdated      | Analytics recalculated    |
| archiveCreated        | Day archived              |
| waitTimeUpdated       | Dynamic wait time updated |

---

# 🧮 Dynamic Wait-Time Prediction

QueueCure uses real consultation data rather than fixed estimates.

### Consultation Duration

consultationDuration = completedAt − calledAt

### Average Consultation Time

averageConsultationTime = totalConsultationDuration ÷ completedPatients

### Estimated Wait Time

estimatedWaitTime = tokensAhead × averageConsultationTime

This provides continuously improving wait-time estimates as consultations progress.

---

# 🏗 System Architecture

Frontend (HTML/CSS/JS)
↓
Socket.IO Client
↓
Node.js + Express.js
↓
Socket.IO Server
↓
MongoDB Atlas

Supporting Services:

* Analytics Engine
* Voice Announcement Module
* Archive Service
* PDF Report Generator

---

# 🏗 Architecture Overview

```text
 ┌──────────────────────┐
 │     Receptionist     │
 └──────────┬───────────┘
            │
            ▼
 ┌──────────────────────┐
 │    Express API       │
 │   + Socket.IO        │
 └──────────┬───────────┘
            │
            ▼
 ┌──────────────────────┐
 │     MongoDB Atlas    │
 └──────────┬───────────┘
            │
 ┌──────────┼───────────┐
 ▼          ▼           ▼

Patient   Doctor     Live Display
Portal   Dashboard      Screen
```

---

# 🚨 Edge Cases Handled

✅ Empty Queue

✅ Duplicate Patients

✅ Invalid Registration Data

✅ Emergency Queue Override

✅ Consultation Skip

✅ Socket Reconnection

✅ Network Recovery

✅ Database Failure Recovery

✅ Real-Time State Synchronization

---

# 🔒 Security Considerations

* Input Validation
* Duplicate Record Prevention
* Server-Side Validation
* Data Integrity Protection
* Role-Based Access Control (Future)
* Authentication Ready Architecture

---

# 📈 Project Statistics

| Metric               | Value         |
| -------------------- | ------------- |
| Dashboards           | 4             |
| API Endpoints        | 10+           |
| Real-Time Events     | 8+            |
| Queue Types          | 3             |
| Deployment Platforms | 3             |
| Reports Generated    | PDF           |
| Architecture Style   | Event-Driven  |
| Database             | MongoDB Atlas |

---

# 📸 Screenshots

All screenshots are available inside:

FinalScreenshots/

Included Modules:

* Landing Page
* Receptionist Dashboard
* Doctor Dashboard
* Patient Portal
* Live Display Screen
* Analytics Dashboard
* History Module
* PDF Reports

---

# 🔥 Why QueueCure Stands Out

### Traditional Queue Systems

❌ Paper Tokens

❌ No Live Updates

❌ Fixed Wait Times

❌ No Analytics

❌ No History

❌ No Real-Time Visibility

---

### QueueCure

✅ Real-Time Synchronization

✅ Dynamic Wait-Time Calculation

✅ Emergency Prioritization

✅ Consultation Analytics

✅ Voice Announcements

✅ PDF Reporting

✅ Historical Records

✅ Production-Inspired Architecture

---

# 🚀 Future Scope

* Mobile Application
* Multi-Doctor Support
* Multi-Hospital Network
* AI Queue Forecasting
* SMS Notifications
* WhatsApp Integration
* Appointment Scheduling
* Cloud-Native Scaling
* Predictive Analytics

---

# 🛠 Local Installation

## Clone Repository

git clone https://github.com/its-pank-7/QueueCure

## Backend Setup

cd backend

npm install

npm start

## Frontend Setup

Open index.html in browser

---

# 👨‍💻 Developer

## Pankaj Raut

B.Tech (Artificial Intelligence & Machine Learning)

Full Stack Developer | Healthcare Technology Enthusiast

Focused on building intelligent systems that solve real-world operational challenges through automation, analytics, and modern software architecture.

### Connect

GitHub: https://github.com/its-pank-7

---

# 🏆 Queue Cure '26 Hackathon Submission

QueueCure demonstrates how real-time communication, intelligent analytics, and modern web technologies can transform traditional hospital queue systems into efficient, transparent, and scalable digital healthcare solutions.

---

# 📜 License

This project is intended for educational, research, and hackathon purposes.
