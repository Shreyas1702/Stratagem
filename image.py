import face_recognition
import cv2
import os


cap = cv2.VideoCapture(0)  # 0 represents the default camera device on the computer

# Check if camera was opened successfully
if not cap.isOpened():
    print("Error opening camera")
    exit()

# Read and display frames from camera until user quits
while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Check if frame was captured successfully
    if not ret:
        print("Error capturing frame")
        break

    # Display the captured frame
    cv2.imshow("Camera", frame)

    # Check for user input to capture an image
    key = cv2.waitKey(1) & 0xFF
    if key == ord("c"):
        # Save the captured image
        cv2.imwrite("captured_image.jpg", frame)
        print("Image captured!")
        break

# Release camera capture object and close window
cap.release()
cv2.destroyAllWindows()

image1 = face_recognition.load_image_file("shubhu.jpeg")
image2 = face_recognition.load_image_file("captured_image.jpg")

# Get the face encodings for both images
face_encoding1 = face_recognition.face_encodings(image1)[0]
face_encoding2 = face_recognition.face_encodings(image2)[0]

# Compare the face encodings
results = face_recognition.compare_faces([face_encoding1],face_encoding2)

print(results)
# Print the result
if results[0]:
    print("The two images are of the same person")
else:
    print("The two images are of different people")