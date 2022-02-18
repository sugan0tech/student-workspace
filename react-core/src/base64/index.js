const getBase64 = (file, cb) => {
  let name = file.name;
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result, name);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

export default getBase64;
