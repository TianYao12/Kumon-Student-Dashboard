interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
}

interface AllStudentData {
  Subject: string; 
  LastName: string; 
  FirstName: string;
  qrID: string;
}

interface AddStudentProps {
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