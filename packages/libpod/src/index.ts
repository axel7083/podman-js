import DockerModem from "docker-modem";
import {Api} from '/@generated/libpod-api';
import {FetchModem} from "/@/fetch-modem";

export class Podman {
    readonly #api: Api<unknown>;
    constructor(options?: DockerModem.ConstructorOptions) {
        this.#api = new Api({
            customFetch: new FetchModem(options).build(),
        });
    }

    get api(): Api<unknown> {
        return this.#api;
    }
}
