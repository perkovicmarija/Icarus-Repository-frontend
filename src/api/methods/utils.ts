export function statusHelper(response: any) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}

export const splitPathToPathAndName = (path: string) => {
  if (path === "/") {
    return {};
  }

  const pathSegments = path.split("/");
  //last path segment will be "",
  //so we need to remove it and also previous segment
  //finally we need to append back the ending "/"
  pathSegments.pop();
  const folderName = pathSegments.pop()!;
  return {
    folderPath: pathSegments.join("/").concat("/"),
    folderName,
  };
};

export const downloadFile = (file: any) => {
  console.log("rafa", file);
  const url = window.URL.createObjectURL(new Blob([file.data]));
  const link = document.createElement("a");
  link.href = url;

  let filename = "";

  const disposition = file.headers["content-disposition"];
  if (disposition && disposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches !== null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }

  filename = decodeURIComponent(filename);

  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};
