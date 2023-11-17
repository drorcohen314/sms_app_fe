import { environment } from "../environments/environment"
export const getBaseUrl = () => {
    return environment.apiUrl || environment.connection + '://' + environment.serverIP + ':' + environment.serverPort
}