document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file");
    const downloadButton = document.getElementById("download");

    // Disable button by default
    downloadButton.disabled = true;

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            downloadButton.disabled = false;
        } else {
            downloadButton.disabled = true;
        }
    });
});