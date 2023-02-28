//export const SERVER_PATH = 'http://localhost:8080';

export function getServerPath() {
    let fullUrl = window.location.href;
    if(fullUrl.includes("localhost")) {
        return 'http://localhost:8080'
    } else {
        const subdomain = fullUrl.split('.')[0];
        return subdomain + '.inxelo.aero/icarussms';
    }

}