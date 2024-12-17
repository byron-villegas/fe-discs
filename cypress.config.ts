import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:4200'
    },
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/results',
        charts: true,
        overwrite: false,
        html: false,
        json: true
    },
    modifyObstructiveCode: false,
    userAgent: 'Robot Chromium',
    video: false
});