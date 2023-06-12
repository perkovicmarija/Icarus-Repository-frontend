import RestApiGet from "../methods/RestApiGet";

const LocationTypeApi = {
    getAll() {
        return RestApiGet.getData('/auditor-actions/location-types');
    }
}

export default LocationTypeApi;