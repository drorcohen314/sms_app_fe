import { environment } from "../environments/environment"

export const getBaseUrl = () => {
    return environment.serverUrl
}