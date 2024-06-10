import { config } from "../config";

export const registerService = async (port) => {
    const url = `http://localhost:9000/register/${config.name}/${config.version}/${port}`
    console.log(url)

    try {
        const response = await fetch(url, { method: 'PUT' })
        if (!response.ok) {
            throw new Error(`Failed to register service: ${response.statusText}`)
        }
        console.log(`Service registered successfully at port ${port}`)
    } catch (err) {
        console.error('Error registering service:', err)
    }
}

export const unregisterService = async (port) => {
    const url = `http://localhost:9000/register/${config.name}/${config.version}/${port}`
    try {
        const response = await fetch(url, { method: 'DELETE' })
        if (!response.ok) {
            throw new Error('Failed to unregister service');
        }
        return await response.json()
    } catch (err) {
        console.error('Error unregistering service:', err);
    }
};