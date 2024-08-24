interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
}

interface AllStudentData {
  Subject: 'Math' | 'Reading'; 
  LastName: string; 
  FirstName: string;
  qrID: string;
}

interface CurrentStudentData {
  FirstName: string;
  LastName: string;
  qrID: string;
  Subject: "Math" | "Reading";
  createdAt: string;
  timeRemaining: number
}

interface AddAllStudentProps {
  addOpen: boolean;
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  studentData: StudentData[];
  setStudentData: React.Dispatch<React.SetStateAction<StudentData[]>>;
}

interface DeleteModalProps {
  student: StudentData | null;
  onDelete: () => void;
  onClose: () => void;
}