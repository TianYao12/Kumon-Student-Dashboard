# Kumon Student Attendance Management System

## Use Case
- When students enter and leave a Kumon center, it is crucial to monitor their time effectively, as they are allowed a maximum of 30 minutes per session. This application provides an efficient solution by tracking student entry times and alerting staff when a student's time is nearly up.
- Upon scanning the QR code associated with a student's file, the app logs the student's entry into a table. The table monitors the remaining time for each student, turning the row red when only 5 minutes are left, signaling that the student needs to leave soon.
- For each student, a QR code signifying that student is placed on their file so that when the student goes into the centre, they scan their file using a QR scanner. All students, and new students that are added to the database needs to have a unique QR Code.

## Tech Summary
- Utilized Mongoose, MongoDB Atlas, Express.js, and React.js in order to display student tables, add/update/delete students, and search for students
- Integrated Firebase authentication
- Built responsive React.js components for student tables with search functionality and react-pdf/renderer to generates QR codes
- Deployed frontend using Vercel static hosting and backend using Vercel serverless functions