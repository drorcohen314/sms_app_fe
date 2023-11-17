import { environment } from "../environments/environment"
export const getBaseUrl = () => {
    return process.env['api_url'] || environment.connection + '://' + environment.serverIP + ':' + environment.serverPort
}