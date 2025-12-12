## `@podman/libpod`

`@podman/libpod` is a JavaScript client for [Podman](https://github.com/containers/podman).

It uses the [swagger spec of Podman](https://docs.podman.io/en/stable/_static/api.html?version=latest) to generate the types using [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api).

:warning: the library is not using the podman binary locally.

## Usage

```ts
import { Podman } from "podman-js";

const podman = new Podman({socketPath: "/run/user/1000/podman/podman.sock"});

const response = await podman.api.containers.containerList({ all: true });
const containers = await response.json();
```
