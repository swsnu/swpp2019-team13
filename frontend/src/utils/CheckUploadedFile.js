export const checkMimeType = event => {
  let files = event.target.files;
  let err = [];
  const types = ["image/png", "image/jpeg", "image/gif"];
  for (let x = 0; x < files.length; x++) {
    if (types.every(type => files[x].type !== type)) {
      err[x] = files[x].type + " is not a supported format\n";
    }
  }
  for (let z = 0; z < err.length; z++) {
    alert(err[z]);
    event.target.value = null;
  }
  return true;
};

export const maxSelectFile = (event, max_file) => {
  let files = event.target.files;
  if (files.length > max_file) {
    const msg = "Only " + max_file + " images can be uploaded at a time";
    event.target.value = null;
    alert(msg);
    return false;
  }
  return true;
};

export const checkFileSize = event => {
  let files = event.target.files;
  let size = 2000000;
  let err = [];
  for (let x = 0; x < files.length; x++) {
    if (files[x].size > size) {
      err[x] = files[x].name + " is too large, please pick a smaller file\n";
    }
  }
  for (let z = 0; z < err.length; z++) {
    alert(err[z]);
    event.target.value = null;
  }
  return true;
};
