import {Config, IConfig} from "./config";

let config: null | IConfig = null

function getConfig(): Config {
    if (!config) {
        config = new Config()
    }

    return config
}

export {getConfig, IConfig};
