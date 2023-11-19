export function statusHelper(response: any) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}

export const downloadFile = ({
  data,
  name,
  headers,
}: {
  data: ArrayBuffer;
  name?: string;
  headers?: any;
}) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;

  let filename = "";

  if (name) {
    filename = name;
  } else {
    const disposition = headers["content-disposition"];
    if (disposition && disposition.indexOf("attachment") !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches !== null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
  }

  filename = decodeURIComponent(filename);

  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};
