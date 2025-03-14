document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file");
    const downloadButton = document.getElementById("download");
    const image = document.getElementById("was_u");
    const text = document.getElementById("was_u_txt");
    const fileCont = document.getElementsByClassName("custum-file-upload")[0];
    const rightText = document.querySelector(".right p"); // Select the right-side text
    let uploadedFile = null;

    downloadButton.disabled = true;

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            uploadedFile = fileInput.files[0];
            image.src = "assets/images/uploaded.svg";
            text.textContent = "File uploaded.";
            text.style.color = "#216869";
            fileCont.style.border = "2px dashed #216869"; 
            downloadButton.disabled = false;

            // Show the expected sorted file name
            const sortedFileName = uploadedFile.name.replace(".txt", "_sorted.txt");
            rightText.textContent = "Ready to process: " + sortedFileName;
        } else {
            uploadedFile = null;
            downloadButton.disabled = true;
            rightText.textContent = "No data available."; // Reset text if no file is selected
        }
    });

    downloadButton.addEventListener("click", function () {
        if (!uploadedFile) return;

        const formData = new FormData();
        formData.append("file", uploadedFile);

        fetch("https://ntcsort.onrender.com", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to process the file");
            }
            return response.blob();
        })
        .then(blob => {
            if (blob.size === 0) {
                throw new Error("Received an empty file.");
            }
            const sortedFileName = uploadedFile.name.replace(".txt", "_sorted.txt");
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = sortedFileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            // Update the text after processing is done
            rightText.textContent = "Ready to download: " + sortedFileName;
        })
        .catch(error => {
            console.error("Error:", error);
            alert(error.message || "Error processing file. Please try again.");
        });
    });
});
