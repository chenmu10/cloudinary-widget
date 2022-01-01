const API_DOMAIN =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : location.hostname;
const CLOUD_NAME = "dgkxdy80k"; 
const uploadButtonElement = document.getElementById("upload-button");
const serverStatusElement = document.getElementById("server-status");
const deleteButtonElement = document.getElementById("delete-button");
const deleteResultElement = document.getElementById("delete-result");
const galleryContainerElement = document.getElementById("gallery-container");
const inputTagElement = document.getElementById("input-tag");

// eslint-disable-next-line no-undef
var cl = cloudinary.Cloudinary.new({
  cloud_name: CLOUD_NAME,
  secure: true,
});
cl.responsive();

deleteButtonElement.addEventListener("click", deleteByTag);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(API_DOMAIN + "/api/sign-upload-widget");
    const cldParams = await response.json();

    const options = {
      cloudName: CLOUD_NAME,
      apiKey: cldParams.apikey,
      uploadSignatureTimestamp: cldParams.timestamp,
      uploadSignature: cldParams.signature,
      tags: ["cl-chen"],
      validateMaxWidthHeight: true,
      maxImageWidth: 750,
      maxImageHeight: 750,
    };

    const processResults = (error, result) => {
      if (!error && result && result.event === "success") {
        renderImage(result.info);
      }
    };

    const cldWidget = window.cloudinary.createUploadWidget(
      options,
      processResults
    );
    uploadButtonElement.addEventListener("click",() => cldWidget.open(),false);
    serverStatusElement.textContent = "";
  } catch (error) {
    serverStatusElement.textContent = "*Server issue. " + error;
  }
});

function renderImage(image) {
  const transformations = {
    width: "auto",
    crop: "fill",
    fetch_format: "auto",
    gravity: "auto",
    aspect_ratio: "4:3",
    quality: "auto",
    dpr: "auto",
  };
  const imageSrc = cl.url(image.public_id, transformations);
  const imageHtml = cl
    .imageTag(`${image.public_id}.${image.format}`, {
      secure: true,
      class: "cld-responsive",
      src: imageSrc,
      responsive: true,
      alt: image.original_filename,
      transformation: [transformations],}).toHtml();

  const imgHtmlStr = `
          <div class="card">
            <div class="image-container">
            <a href="${image.secure_url}" target="_blank">
            ${imageHtml}
            </a>
            </div>
            <div class="file-description">
            <div class="file-tag"><span class="tag">${image.tags}</span></div>
            <div class="file-name">${image.original_filename}.${image.format}</div>
            <div>${image.width}x${image.height}</div>
            <div>Original size: ${Math.round(image.bytes / Math.pow(1024, 1))} KB</div>         
            <div>Upload Date: ${new Date(image.created_at).toLocaleDateString()}</div>
            </div>
         </div>
      `;

  galleryContainerElement.innerHTML += imgHtmlStr;
}

async function deleteByTag() {
  try {
    deleteResultElement.textContent = "Deleting..";
    const tagName = inputTagElement.value;
    const response = await fetch(
      `${API_DOMAIN}/api/delete-by-tag?tag_name=${tagName}`
    );
    const data = await response.json();

    const deletedNum = Object.keys(data.result.deleted).length;
    deleteResultElement.textContent = "Deleted: " + deletedNum;
    galleryContainerElement.innerHTML ='';
  } catch (error) {
    deleteResultElement.textContent = error;
  }
}
