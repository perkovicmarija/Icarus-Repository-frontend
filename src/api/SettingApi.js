import RestApiGet from "./methods/RestApiGet";


// const clients = [
//     { companyId: 1, name: "Trade Air", abbreviation: "TDR"},
//   { companyId: 2, name: "Elite Jet", abbreviation: "EJ"},
//   { companyId: 3, name: "Qazaqi air", abbreviation: "IQ"}
// ]

const SettingApi = {
  getAllClients() {
    return RestApiGet.getData('/setting/getAllClients', {});
  },
}

export default SettingApi;
