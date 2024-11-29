export const parseContentDisposition = (disposition) => {
  let filename = "";
  let protectedFromDownload = true;
  if (disposition && disposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches !== null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
    let dispositionsArray = disposition.split(";");
    if (dispositionsArray.length === 3) {
      let protectedProp = dispositionsArray[2].trim();
      let protectedArray = protectedProp.split("=");
      if (protectedArray.length === 2) {
        let protectedValue = protectedArray[1];
        protectedFromDownload = protectedValue === "true";
      }
    }
  }
  filename = decodeURIComponent(filename);

  return { filename, protectedFromDownload };
};
