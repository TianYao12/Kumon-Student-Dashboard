import csv

def csv_to_custom_json(csv_file_path):

    students = []

    with open(csv_file_path, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        for row in csv_reader:
            # Create the custom JSON data
            data = {
                "Subject": row['Subject'],
                "LastName": row['Last Name'],
                "FirstName": row['First Name'],
                "qrID": row['qrID']
            }

            students.append(data)

        return students
