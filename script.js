document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file");
    const downloadButton = document.getElementById("download");
    const image = document.getElementById("was_u");
    const text = document.getElementById("was_u_txt");
    const fileCont = document.getElementsByClassName("custum-file-upload")[0];


    // Disable button by default
    downloadButton.disabled = true;

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            downloadButton.disabled = false;
            image.src = "assets/images/uploaded.svg";
            text.textContent = "File uploaded.";
            text.style.color = "rgb(93, 187, 0)";
            fileCont.style.border = "2px dashed #5dbb00";
        } else {
            downloadButton.disabled = true;
        }
    });
});