import express from 'express';
import { config } from '../config'

import { registerService, unregisterService } from './service-handler';
const app = express()
const port = 9001

config.name = "service_1"
config.version = "1.0.0"

app.get('/', (_, res) => {
    res.send('Olá, sou o serviço 1')
})

app.listen(port, async () => {
    await registerService(port.toString())
})

process.on('uncaughtException', async () => {
    await unregisterService(port.toString())
    process.exit(0)
});

process.on('SIGINT', async () => {
    await unregisterService(port.toString())
    process.exit(0)
});

process.on('SIGTERM', async () => {
    await unregisterService(port.toString())
    process.exit(0)
});