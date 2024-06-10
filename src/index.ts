import express, { Request, Response } from "express"
import createServiceRegistry from "./service-registry"
const app = express()
const PORT = 9000

const serviceRegistry = createServiceRegistry(console)

app.get('/', (req: Request, res: Response) => {
    res.send('Hei, registre um novo serviço')
})

app.put('/register/:serviceName/:serviceVersion/:servicePort', (req: Request, res: Response) => {
    const { serviceName, serviceVersion, servicePort } = req.params
    const serviceIp = req.socket.remoteAddress?.includes('::')
        ? `[${req.socket.remoteAddress}]` : req.socket.remoteAddress

    const serviceKey = serviceRegistry.register(
        serviceName, serviceVersion, serviceIp, servicePort
    )

    res.json({ serviceKey })
})

app.delete('/register/:serviceName/:serviceVersion/:servicePort', (req: Request, res: Response) => {
    const { serviceName, serviceVersion, servicePort } = req.params
    const serviceIp = req.socket.remoteAddress?.includes('::')
        ? `[${req.socket.remoteAddress}]` : req.socket.remoteAddress
    serviceRegistry.unregister(serviceName, serviceVersion, serviceIp!, servicePort)
    res.status(200).send()
})

app.get('/find/:serviceName/:serviceVersion', (req: Request, res: Response) => {
    const { serviceName, serviceVersion } = req.params
    const service = serviceRegistry.getCandidate(serviceName, serviceVersion)
    if (!service) return res.status(404).json({ result: 'Service not found' })
})

app.listen(PORT, () => {
    console.log(`App listening on port  ${PORT}`)
})
