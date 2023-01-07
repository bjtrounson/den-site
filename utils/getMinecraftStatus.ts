import {ServerStatus} from "../interfaces/ServerStatus";

const getMinecraftStatus = async (ips: string[]) => {
    // get server status from api
    // return status
    return await Promise.all(ips.map(async (ip) => {
        const res = await fetch(`https://api.mcsrvstat.us/2/${ip}`)
        return await res.json() as ServerStatus
    }))
}

export default getMinecraftStatus
