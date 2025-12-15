// Accessing HTML elements
const imageBox = document.getElementById("imageBox");
const qrImage = document.getElementById("qrImg");
const qrText = document.getElementById("qrText");

function GenerateQR() {
  
  const inputValue = qrText.value.trim();

  if (inputValue) {
    
    qrImage.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      encodeURIComponent(inputValue);

    
    imageBox.classList.add("show-img");
  } else {
   
    qrText.classList.add("error");
    

   
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);

    
  }
}
