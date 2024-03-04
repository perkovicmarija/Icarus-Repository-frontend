export function getServerPath() {
  let fullUrl = window.location.href;
  if (fullUrl.includes("localhost")) {
    return 'http://localhost:8081';
    //return "https://repository-test.inxelo.aero/icarussms";
  } else {
    return 'http://localhost:8081';
  }
}
