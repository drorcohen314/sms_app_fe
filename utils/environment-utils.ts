import { environment } from "../environments/environment"
export const getBaseUrl = () => {
    return environment.connection + '://' + environment.serverIP + ':' + environment.serverPort
}