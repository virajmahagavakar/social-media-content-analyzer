# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).


# Social Media Content Analyzer

A full-stack application that extracts text from uploaded PDF and image files, performs sentiment & content analysis, and provides improvement suggestions for social media engagement.

This project was created as part of a technical assessment requirement.

---

## 📌 Features

### 🔹 Document Upload
- Upload PDF or image files  
- Drag-and-drop or file chooser support  

### 🔹 Text Extraction
- PDF text extraction using **Apache PDFBox**
- OCR text extraction for images using **Tesseract (Tess4J)**

### 🔹 Analysis
- Sentiment detection  
- Keyword extraction  
- Content quality insights  

### 🔹 Frontend UI
- React-based responsive UI  
- Loader, error handling, and clean UX  

---

## 📁 Project Structure

root/
├── social-media-analyzer-frontend/ (React UI)
├── social-media-analyzer-backend/ (Spring Boot API)
└── README.md

---

## 🏗 Backend (Spring Boot)

### 📂 Folder Structure

backend/
├── src/
│ ├── main/
│ │ ├── java/
│ │ │ └── com/socialmedia/social_media_analyzer_backend/
│ │ │ ├── controller/
│ │ │ │ └── FileUploadController.java
│ │ │ ├── model/
│ │ │ │ └── AnalysisResult.java
│ │ │ └── service/
│ │ │ ├── FileService.java
│ │ │ ├── SentimentAnalyzer.java
│ │ │ ├── TextAnalysisService.java
│ │ │ └── SocialMediaAnalyzerBackendApplication.java
│ │ ├── resources/
│ │ └── application.properties
├── tessdata/
│ └── eng.traineddata
├── pom.xml

Backend will run on:  
**http://localhost:8080**


## 🎨 Frontend (React)

### folder structure 

social-media-analyzer-frontend/
│
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── node_modules/      (auto-generated)
├── public/
│   └── vite.svg
│
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    │
    ├── assets/
    │   └── react.svg
    │
    ├── component/
    │   ├── AnalysisResult.jsx
    │   └── FileUpload.jsx
    │
    └── services/
        └── api.js


 ## project summary       

The Social Media Content Analyzer was built as a full-stack application designed to extract text from user-uploaded PDF and image files, then provide content insights. The backend is implemented using Spring Boot, chosen for its production-ready structure, strong file-handling capabilities, and ease of integrating OCR and PDF parsing. PDF text extraction is performed using Apache PDFBox, while image text extraction is handled using Tesseract OCR (Tess4J). Both methods ensure accurate retrieval of text from diverse document formats. The backend also includes proper error handling, descriptive responses, and well-organized services for long-term maintainability.

The frontend is built with React.js to deliver a responsive and intuitive user experience. It includes drag-and-drop uploads, loading indicators, error UI, and a clean component structure. Axios is used for API communication, and results are displayed with simple, readable formatting.

The project follows clean coding principles: modular functions, separated concerns, and reusable components. Basic documentation is included to describe setup steps, architecture, and API usage.

Finally, the application is container-friendly and can be deployed on free cloud platforms. The goal is to simulate a real production workflow while staying within the given 8-hour project limit.

🧑‍💻 Author
viraj mahagavakar...


