# 🏥 QueueCure – AI-Powered Smart Hospital Queue Management System

![Hackathon Project](https://img.shields.io/badge/Hackathon-Queue%20Cure%20'26-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-black)
![License](https://img.shields.io/badge/License-Educational-orange)

## 🚀 Project Overview

QueueCure is a real-time hospital queue management platform designed to eliminate paper-token systems and modernize patient flow management in clinics and hospitals.

Built using Node.js, Express.js, MongoDB Atlas, and Socket.IO, QueueCure provides instant queue synchronization, intelligent wait-time estimation, emergency queue prioritization, analytics, reporting, and historical record management.

The platform improves transparency for patients, reduces receptionist workload, enhances doctor coordination, and delivers actionable operational insights for healthcare facilities.

---

## 🎯 Problem Statement

Over 76% of clinics still rely on manual queue systems, leading to:

* Long waiting times
* No queue visibility
* Receptionist overload
* Unpredictable consultation schedules
* Poor patient experience
* Lack of operational analytics

QueueCure addresses these challenges through a fully digital, real-time queue management ecosystem.

---

## 💡 Solution

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
* Real-Time Queue Synchronization
* Daily Archive System

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

## 📊 AI Consultation Analytics

QueueCure uses dynamic consultation analytics to estimate waiting times.

### Consultation Duration

consultationDuration = completedAt − calledAt

### Average Consultation Time

averageConsultationTime = totalDuration / completedPatients

### Estimated Wait Time

estimatedWaitTime = tokensAhead × averageConsultationTime

Unlike traditional fixed estimates, QueueCure adapts to real clinic performance in real time.

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

# 🔄 Real-Time Architecture

QueueCure uses Socket.IO to achieve sub-second synchronization across:

* Receptionist Dashboard
* Doctor Dashboard
* Patient Portal
* Live Display Screen

Benefits:

* No page refresh required
* Instant queue updates
* Live token changes
* Dynamic wait-time updates
* Automatic reconnection support

---

# ⚙️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas

## Real-Time Communication

* Socket.IO

## Reporting

* PDFKit

## Deployment

### Frontend

Vercel

### Backend

Render

### Database

MongoDB Atlas

---

# 📈 Project Highlights

* Real-Time Queue Synchronization
* Emergency Queue Prioritization
* Dynamic Wait-Time Calculation
* Multi-Portal Architecture
* Voice Announcement System
* Daily PDF Reports
* Historical Data Archiving
* Glassmorphism UI Design
* Production-Inspired Architecture

---

# 📸 Project Screenshots

Screenshots are available inside:

FinalScreenshots/

Included modules:

* Landing Page
* Receptionist Dashboard
* Doctor Dashboard
* Patient Portal
* Live Display Screen
* Analytics Dashboard
* History Module
* PDF Reports

---

# 🏗 System Architecture

QueueCure follows a layered architecture:

Frontend (Client Layer)
↓
Node.js + Express.js API Layer
↓
Socket.IO Real-Time Layer
↓
MongoDB Atlas Database

Supporting Services:

* Analytics Engine
* Voice Announcement Module
* Archive Service
* PDF Report Generator

---

# 🚀 Live Deployment

### Frontend

https://queue-cure-465l.vercel.app/

### Backend

https://queuecure-zrfx.onrender.com

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

# 🔮 Future Scope

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

# 👨‍💻 Developer

## Pankaj Raut

B.Tech (Artificial Intelligence & Machine Learning)

Full Stack Developer | Healthcare Technology Enthusiast

Focused on building intelligent systems that solve real-world operational challenges through automation, analytics, and modern software architecture.

---

# 🏆 Queue Cure '26 Hackathon Submission

QueueCure demonstrates how real-time communication, intelligent analytics, and modern web technologies can transform traditional hospital queue systems into efficient, transparent, and scalable digital healthcare solutions.

---

## 📜 License

This project is intended for educational, research, and hackathon purposes.
