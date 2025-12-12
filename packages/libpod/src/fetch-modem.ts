import DockerModem from 'docker-modem';

export class FetchModem {
    #modem: DockerModem;

    constructor(options?: DockerModem.ConstructorOptions) {
        this.#modem = new DockerModem(options);
    }

    build(): typeof fetch {
        return async (input: RequestInfo | URL, init?: RequestInit) => {
            let path: string;
            if(typeof input === 'object') {
                if(('url' in input)) {
                    path = input.url;
                } else {
                    path = input.pathname;
                }
            } else {
                path = input;
            }

            const optsf: DockerModem.DialOptions = {
                path: path,
                method: init?.method ?? 'GET',
                statusCodes: {
                    200: true,
                    500: 'server error',
                },
                options: {},
            };

            const result = await new Promise((resolve, reject) => {
                this.#modem.dial(optsf, (err: unknown, data: unknown) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data);
                });
            });

            return Response.json(result);
        }
    }

}
