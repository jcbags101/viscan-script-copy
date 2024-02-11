# Program Features
Back to [Navigation](https://github.com/janetub/ViscanScript/blob/main/Design%20Specification/ViscanScript.md)

---

## 1. Provide An Online Form for Data Entry and File Upload

### Online Form
This is used to collect the student’s information and softcopy requirements for thesis submission and binding.
#### Input:
The student shall fill in the online form with their name, student number, email address, course code, thesis     title, and number of copies.
#### Process:
- The user shall initiate the data entry process.
- The system shall provide fields for the user to enter their name, student number, email address, course code, and thesis title.
- The student shall upload two e-copy or softcopy of the manuscript, one in PDF and one in Word format.
- The student shall upload one file of 2-by-2 ID picture in JPG or JPEG format.
- The student shall choose an appointment date from the available dates.
- The user shall submit the form after entering the required information.
#### Output:
The online form is submitted and the data and files are stored in the database.

---

## 2. Validate the Data and Files Entered by the Student

### Data and File Validation
This is used to ensure that the student enters valid and complete data and uploads files that are in the correct format and size.
#### Input:
The student shall enter the data and upload the files in the online form.
#### Process:
- The system shall check the data entered by the student for completeness and validity.
- The system shall check the files uploaded by the student for format and size.
- The system shall display an error message if the data or files are invalid or incomplete.
#### Output:
The data and files are validated and the student is informed of the result.

---

## 3. Display an Error or Confirmation Message Upon Form Submission

### Error Message Display
This is used to inform the student if there are any errors in their submission
#### Input:
The system shall check the data and files entered by the student.
#### Process:
- The system shall display an error message if the student enters invalid or incomplete data, or uploads files that are not in the correct format or size.
#### Output:
This is used to confirm the successful submission of the form.

### Confirmation Message Display
This is used to inform the student if there are any errors in their submission
#### Input:
The system shall check the data and files entered by the student.
#### Process:
- The system shall display a confirmation message and a summary of the data entered and the files uploaded when the student submits the form successfully.
#### Output:
The confirmation message is displayed.

---

## 4. Generate a Unique Priority Number for Each Order

### Priority Number Generation
This is used to assign a unique priority number to each student or order based on the date and time of form submission.
#### Input:
The student shall enter the data and upload the files in the online form.
#### Process:
- The system shall generate a unique priority number for each student or order using a sequential number algorithm, which starts with 1 as the first number and adds 1 to the previous number to get the next number.
- The system shall store the priority number in the database along with the data and files.
- The system shall send an email to the student with their priority number and appointment details.
#### Output:
The priority number is generated and the student is notified by email.

---

## 5. Store the Order Data and Files in the Database

### Order Data and File Storage
This is used to store the order data and files in the database for future reference and processing.
#### Input:
The student shall submit the online form with their data and files.
#### Process:
- The system shall store the priority number, the data entered, and the files uploaded in the database, along with the status of the order (e.g., pending, reviewed, paid, completed, etc.).
#### Output:
The order data and files are stored in the database.

---

## 6. Send an Email to the Student with Their Priority Number and Appointment Details

### Appointment Email Notification
This is used to notify the student about their priority number and appointment details via email.
#### Input:
The student shall submit the online form with their data and files.
#### Process:
- The system shall use Nodemailer to send an email to the student with their priority number, along with the time and date of their appointment, within 24 hours of form submission.
#### Output:
The appointment details are sent to the student via email.

---

## 7. Display the Current Priority Number Being Served on a Screen

### Priority Number Display
This is used to show the current priority number being served on a screen in the library.
#### Input:
The library staff either presses the ‘next’ button or moves on to the next priority number on their interface.
#### Process:
- The system shall display the current priority number being served on a screen in the library.
- The system shall update the display when it receives the signal to advance to the next priority number.
#### Output:
- The current priority number is displayed on the screen.

---

##  8. Access the Order Details by Priority Number

###  Order Details Access
This is used to allow the library staff to access the order details by priority number.
#### Input:
The library staff shall select an order from the dashboard or a list of orders.
#### Process:
- The library staff shall select an order to view its details.
- The system shall retrieve the details of the selected order from the database.
- The library staff can move on to the next priority number by pressing the ‘next’ button or through their interface.
#### Output:
The order details are accessed and displayed by priority number.

---

## 9. Mark the Order as Checked or Rejected and Provide Feedback or Comments

### Order Status Update
This feature is used to manage the status of library orders and provide necessary feedback after checking and verification of binding order requirements completeness and validity.
#### Input:
The library staff shall initiate the order verification process.
#### Process:
- The library staff shall review the details of the order.
- The system shall display the current status and details of the order.
- The library staff shall update the status of the order as either ‘checked’ or ‘rejected’.
- The library staff shall provide feedback or comments on the order if necessary.
- The system shall update the status of the order in the database and store any feedback or comments provided.
#### Output:
The order status is updated and any feedback is recorded in the system.

---

## 10. Generate and Print an Acknowledgement Receipt for Each Order

### Acknowledgement Receipt Generation
This is used to generate and print an acknowledgement receipt for each order after the library staff has checked and validated the materials.
#### Input:
The library staff shall update the status of the order to “Reviewed” in the system.
#### Process:
- The system shall reflect the updated status in the user interface and update the order status in the database. 
- A button for receipt generation shall be enabled.
- The library staff shall click the button to generate a printable receipt.
- The system shall fetch the information from the order details and populate the receipt template using the PDF library.
- The system shall generate a PDF file and display it for printing.
- The library staff shall print the receipt.
- The system shall acknowledge the print command, and then redirect to the “Order Queue Interface”.
- This interface shall display the list of pending orders, prioritized by the order in which they are to be processed next.
- The library staff shall manually validate and issue the printed receipt to the student.
#### Output:
The acknowledgement receipt is generated and printed.

---
## 11. Update the Payment Status in the Database

### Update Payment Status
This is used to mark an order as paid and generate a binding order receipt.
#### Input:
The billing staff shall select an order from the list of orders with the status “Reviewed”.
#### Process:
- The billing staff shall enter the amount of payment received from the student.
- The system shall validate the payment amount and compare it with the binding fee.
- The system shall update the payment status of the order to “Paid” in the database.
- The system shall enable a button for generating a binding order receipt
#### Output:
The payment status of the order is updated and a binding order receipt can be generated.

---

## 12. Generate a Printable Binding Order Receipt for Each Order

### Binding Order Receipt Generation
This is used to generate and print a binding order receipt for each order after the billing staff has updated the payment status in the database.
#### Input:
The billing staff shall click the button for generating a binding order receipt.
#### Process:
- The system shall fetch the information from the order details and the payment status and populate the receipt template using the PDF library.
- The system shall generate a PDF file and display it for printing.
- The billing staff shall print the receipt.
- The system shall acknowledge the print command, and then redirect to the “Order Queue Interface”.
- This interface shall display the list of pending orders, prioritized by the order in which they are to be processed next.
#### Output:
The binding order receipt is generated and printed.

---

## 13. Confirm That the Order Is Complete and Ready for Claiming

### Order Completion
This is used to mark an order as complete and notify the student via email.
#### Input:
The library staff shall select an order from the list of orders that are in the binding process.
#### Process:
- The library staff shall click on the “Complete” button to mark the order as complete.
- The system shall update the order status to “Complete” in the database.
- The system shall send an email to the student with the order details and instructions on how to claim their bound thesis.
#### Output:
The order is marked as complete and the student is notified via email.

---

## 14. Send an Email to the Student Notifying Them That Their Order Is Ready for Pickup

### Email Notification
This is used to send an email to the student with the order details and instructions on how to claim their bound thesis.
#### Input:
The system shall trigger the email notification after the library staff has marked the order as complete.
#### Process:
- The system shall use Nodemailer to create and send an email to the student’s email address.
- The system shall use the order details and the payment status to populate the email template.
#### Output:
The email is sent to the student and the order is ready for claiming.

---

## 15. Update the Order Status in the Database as Completed

### Order Claiming Status Update
This is used to mark an order as completed and ready for claiming by the student.
#### Input:
The library staff shall select an order from the list of orders.
#### Process:
- The library staff shall click on the “Mark as Completed” button.
- The system shall update the order status in the database as “Completed”.
- The system shall send an email notification to the student with the order details and instructions for claiming.
#### Output:
The order status is updated as “Completed” and the student is notified.

---

Back to [Navigation](https://github.com/janetub/ViscanScript/blob/main/Design%20Specification/ViscanScript.md)

---
