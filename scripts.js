// Global variables
const imgInputHelper = document.getElementById("add-single-img");
const imgInputHelperLabel = document.getElementById("add-img-label");
const imgContainer = document.querySelector(".custom__image-container");
const imgFiles = [];

const addImgHandler = () => {
  const file = imgInputHelper.files[0];
  if (!file) return;

  // Generate img preview
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const newImg = document.createElement("img");
    newImg.src = reader.result;
    imgContainer.insertBefore(newImg, imgInputHelperLabel);
  };

  // Store img file
  imgFiles.push(file);

  // Reset image input
  imgInputHelper.value = "";
  return;
};

const getImgFileList = (imgFiles) => {
  const imgFilesHelper = new DataTransfer();
  imgFiles.forEach((imgFile) => imgFilesHelper.items.add(imgFile));
  return imgFilesHelper.files;
};

const printFiles = (files, container) => {
  container.innerHTML = "";
  for (let i = 0; i < files.length; i++) {
    const p = document.createElement("p");
    p.textContent = `File: ${files[i].name}, size: ${files[i].size}`;
    container.appendChild(p);
  }
};

const basicFormSubmitHandler = (ev) => {
  ev.preventDefault();
  const files = document.getElementById("basic-image-input").files;
  const container = document.getElementById("basic__print-files");
  printFiles(files, container);
};

const customFormSubmitHandler = (ev) => {
  ev.preventDefault();
  const firstImgInput = document.getElementById("image-input");
  firstImgInput.files = getImgFileList(imgFiles);
  const container = document.getElementById("custom__print-files");
  printFiles(firstImgInput.files, container);
};

imgInputHelper?.addEventListener("change", addImgHandler);

document.querySelector(".custom__form")?.addEventListener("submit", customFormSubmitHandler);
document.querySelector(".basic__form")?.addEventListener("submit", basicFormSubmitHandler);
