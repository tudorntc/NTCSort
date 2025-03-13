from flask import Flask, request, send_file
import os

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return "No file part", 400

    file = request.files["file"]
    if file.filename == "":
        return "No selected file", 400

    # Save uploaded file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Process the file
    sorted_file_path = process_file(file_path)

    # Send the processed file back
    return send_file(sorted_file_path, as_attachment=True)

def process_file(file_path):
    with open(file_path, "r") as file:
        words = [word.strip() for line in file for word in line.split(",")]

    words.sort()

    sorted_filename = os.path.splitext(os.path.basename(file_path))[0] + "_sorted.txt"
    sorted_file_path = os.path.join(PROCESSED_FOLDER, sorted_filename)

    with open(sorted_file_path, "w") as file:
        file.write(", ".join(words))

    return sorted_file_path

if __name__ == "__main__":
    app.run(debug=True)
