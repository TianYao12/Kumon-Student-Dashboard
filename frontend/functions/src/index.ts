import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

interface StudentData {
  name: string;
  kumon_id: string;
  duration: number;
  time_entered: {
    _seconds: number;
    _nanoseconds: number;
  };
}

interface FormattedStudentData {
  name: string;
  kumon_id: string;
  duration: number;
  time_entered: string;
}

export const getAllStudentData = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("student_data").get();
    if (snapshot.empty) {
      res.status(404).json({ message: "No student data found" });
      return;
    }
    const studentData: FormattedStudentData[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as StudentData;
      const timeEnteredTimestamp = data.time_entered;
      const timeEnteredDate = new Date(timeEnteredTimestamp._seconds * 1000 + timeEnteredTimestamp._nanoseconds / 1000000);
      const formattedTimeEntered = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(timeEnteredDate);
      
      studentData.push({ 
        name: data.name, 
        kumon_id: data.kumon_id, 
        duration: data.duration, 
        time_entered: formattedTimeEntered 
      });
    });

    res.status(200).json({ data: studentData });

  } catch (error) {
    console.error("Error retrieving student data: ", error);
    res.status(500).send("Internal Server Error");
  }
});

export const addStudentData = functions.https.onRequest(async (req, res) => {
  try {
    const { duration, kumon_id, name, time_entered } = req.body;

    if (
      typeof duration !== "number" ||
      typeof kumon_id !== "string" ||
      typeof name !== "string" ||
      typeof time_entered !== "string"
    ) {
      res.status(400).send("Invalid input data.");
      return;
    }
    const newStudentRef = await db.collection("student_data").add({
      duration,
      kumon_id,
      name,
      time_entered: new Date(time_entered),
    });

    const newStudentDoc = await newStudentRef.get();
    if (!newStudentDoc.exists) {
      res.status(404).json({ error: "Document not found" });
    } else {
      const data = newStudentDoc.data() as StudentData;
      const timeEnteredTimestamp = data?.time_entered;
      const timeEnteredDate = new Date(timeEnteredTimestamp._seconds * 1000 + timeEnteredTimestamp._nanoseconds / 1000000);

      const formattedTimeEntered = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(timeEnteredDate);

      res.status(200).json({
        data: {
          name: data.name,
          kumon_id: data.kumon_id,
          duration: data.duration,
          time_entered: formattedTimeEntered
        }
      });
    }
  } catch (error) {
    console.error("Error adding student data: ", error);
    res.status(500).send("Internal Server Error");
  }
});

export const deleteStudentData = functions.https.onRequest(async (req, res) => {
  try {
    const { kumon_id } = req.body;

    if (typeof kumon_id !== "string") {
      res.status(400).send("Invalid kumon_id.");
      return;
    }

    const studentQuerySnapshot = await db.collection("student_data").where("kumon_id", "==", kumon_id).get();

    if (studentQuerySnapshot.empty) {
      res.status(404).json({ message: "Document not found" });
      return;
    }

    const batch = db.batch();
    studentQuerySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    res.status(200).json({ message: "Document(s) deleted successfully" });
  } catch (error) {
    console.error("Error deleting student data: ", error);
    res.status(500).send("Internal Server Error");
  }
});