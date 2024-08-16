import qrcode
import csv
import uuid

# Directory to save the QR codes
output_dir = "qrcodes/"
file_path = ""

# Read the student.csv file
with open(file_path, mode='r') as infile:
    reader = csv.DictReader(infile)
    students = list(reader)

# Add a new column to store QR ID
for student in students:
    # Generate a random UUID for the QR ID
    qr_id = str(uuid.uuid4())

    # Create a QR code object with the required specifications
    qr = qrcode.QRCode(version=3, box_size=20, border=10, error_correction=qrcode.constants.ERROR_CORRECT_H)
    
    # Add data to the QR code (Here, the qr_id is used as data)
    qr.add_data(qr_id)
    qr.make(fit=True)
    
    # Create an image from the QR code
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save the QR code image with the filename as firstNameLastName.png
    img.save(f"{output_dir}{student['First Name']}{student['Last Name']}.png")
    
    # Add the qr_id to the student data
    student['qrID'] = qr_id

# Write the updated data back to a new CSV file
with open('student_with_qrID.csv', mode='w', newline='') as outfile:
    fieldnames = students[0].keys()
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    
    writer.writeheader()
    writer.writerows(students)
