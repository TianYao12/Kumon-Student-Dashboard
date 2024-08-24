interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
}

interface StudentData {
  kumon_id: string; 
  name: string; 
  time_entered: string; 
  subject: string;
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