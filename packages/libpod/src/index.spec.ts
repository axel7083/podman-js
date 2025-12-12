import { test } from 'vitest';
import { Api as DockerApi } from "/@generated/libpod-api";

import {FetchModem} from "./fetch-modem";
import {Podman} from "/@/index";

test('windows', {
    skip: true
}, async () => {
    const api = new DockerApi({
        customFetch: new FetchModem({socketPath: "\\\\.\\pipe\\podman-machine-default"}).build(),
    });

    const response = await api.containers.containerList({
        all: true,
    });
    console.log(response.data);
});

test('linux', async () => {
    const libpod = new Podman({socketPath: "/run/user/1000/podman/podman.sock"});

    const response = await libpod.api.containers.containerList({ all: true });
    console.log(response.data);
});
