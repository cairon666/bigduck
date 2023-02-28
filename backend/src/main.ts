import {App} from "./App";

const bootstrap = async () => {
    const app = new App()
    await app.setup()
    await app.run()
}


bootstrap()