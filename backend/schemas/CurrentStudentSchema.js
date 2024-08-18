const currentStudentSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    qrID: String,
    Subject: String,
    EnterTime: Date
  }, { collection: 'CurrentStudents' });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;