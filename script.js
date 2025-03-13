document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file");
    const downloadButton = document.getElementById("download");
    const image = document.getElementById("was_u");
    const text = document.getElementById("was_u_txt");
    const fileCont = document.getElementsByClassName("custum-file-upload")[0];
    let uploadedFile = null;

    // Disable download button initially
    downloadButton.disabled = true;

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            uploadedFile = fileInput.files[0];
            image.src = "assets/images/uploaded.svg";
            text.textContent = "File uploaded.";
            text.style.color = "#216869";
            fileCont.style.border = "2px dashed #216869";
            downloadButton.disabled = false;
        } else {
            uploadedFile = null;
            downloadButton.disabled = true;
        }
    });

    downloadButton.addEventListener("click", function () {
        if (!uploadedFile) return;

        const formData = new FormData();
        formData.append("file", uploadedFile);

        fetch("http://127.0.0.1:5000/upload", {
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
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = uploadedFile.name.replace(".txt", "_sorted.txt");
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error processing file. Please try again.");
        });
    });
});
