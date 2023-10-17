import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import schemas from './sanity/schema';

const config = defineConfig({
    projectId: 's29n91p9',
    dataset: 'production',
    apiVersion: '2023-09-09',
    title: 'Tutorial Blog',
    description: 'This is a blog website made for learning purposes.',
    basePath: '/admin',
    plugins: [
        deskTool(),
    ],
    schema : {
        types : schemas
    }
});

export default config;