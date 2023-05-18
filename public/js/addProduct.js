////// Change the image displayed when the user uploads product image
// Only the first image can be changed
let displayImage = document.getElementById("display-image");
let inputImage = document.getElementById("myFile");

inputImage.addEventListener("change", displayUploadImage);

function displayUploadImage() {
    displayImage.src = URL.createObjectURL(inputImage.files[0]);
};
//////