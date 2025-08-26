const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dywl8z3of",
  api_key: "444339839749679",
  api_secret: "NGgAXFGzWge2q8s_rOK_p1B92J8",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage: storage });

module.exports = { upload, imageUploadUtil };
