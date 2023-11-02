export function clearToken() {
  localStorage.removeItem("token");
}

export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (err) {
    clearToken();
    return null;
  }
}
