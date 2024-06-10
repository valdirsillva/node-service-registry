import semver from 'semver'

const createServiceRegistry = (log: any) => {
    const services = {}

    const register = (name: string, version: string, ip: string | undefined, port: string | undefined) => {
        const key = name + version + ip + port

        // Se não existir um serviços, registre um novo
        if (!services[key]) {
            // services[key].timestamp = Math.floor(new Date().getMilliseconds() / 1000)
            services[key].ip = ip
            services[key].port = port
            services[key].name = version
            log.debug(`Registrando serviço ${name}, version ${version}  at ${ip}:${port}`)
        } else {
            // services[key].timestamp = Math.floor(new Date().getMilliseconds() / 1000)
            log.debug(`Atualizando serviço ${name}, version ${version}  at ${ip}:${port}`)
        }

        return key
    }

    const unregister = (name: string, version: string, ip: string, port: string) => {
        const key = name + version + ip + port
        Reflect.deleteProperty(services, key)
        log.debug(`Desfazendo registro do serviço ${name}, version ${version}  at ${ip}:${port}`)
    }

    const getCandidate = (name: string, version: string) => {
        const candidates = Object.values(services).filter((service: any) =>
            service.name === name && semver.satisfies(service.version, version)
        )
        return candidates[Math.floor(Math.random() * candidates.length)]
    }

    return { register, unregister, getCandidate }
}
export default createServiceRegistry;