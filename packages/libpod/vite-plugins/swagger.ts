import type { Plugin } from 'vite'
import { generateApi } from 'swagger-typescript-api';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export const PODMAN_LIBPOD_SWAGGER_URL = 'https://storage.googleapis.com/libpod-master-releases/swagger-latest.yaml';

export function swagger(): Plugin {
    return {
        name: 'vite-plugin-swagger',
        enforce: 'pre',
        configResolved: async (resolved) => {
            const generated = join(resolved.root, 'generated');
            await mkdir(generated, { recursive: true });

            const swagger = join(generated, 'swagger.yaml');

            const response = await fetch(PODMAN_LIBPOD_SWAGGER_URL);

            const text = await response.text();
            await writeFile(swagger, text, { encoding: 'utf-8'});

            await generateApi({
                input: swagger,
                output: generated,
                fileName: 'libpod-api.ts',
            });
        },
    };
}
