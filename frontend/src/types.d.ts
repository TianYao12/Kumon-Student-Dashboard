interface StudentData {
  duration: number; 
  kumon_id: string; 
  name: string; 
  time_entered: string; 
}

interface AddStudentProps {
  addOpen: boolean;
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  studentData: StudentData[];
  setStudentData: React.Dispatch<React.SetStateAction<StudentData[]>>;
}
