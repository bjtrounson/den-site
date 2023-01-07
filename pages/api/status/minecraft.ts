// Next.JS API Route TypeScript
import {NextApiRequest, NextApiResponse} from 'next'
import getMinecraftStatus from "../../../utils/getMinecraftStatus";



export default (req: NextApiRequest, res: NextApiResponse) => {
    // get ips from request
    const {ips} = req.query
    // get server status from api
    // ip null check
    // get string list from ips with , as delimiter
    const ipList = ips ? ips.toString().split(",") : []
    if (ipList) {
        getMinecraftStatus(ipList).then((data) => {
            res.status(200).json({status: "success", data})
        }).catch((err) => {
            res.status(500).json({status: "error", message: err})
        })
    } else {
        res.status(400).json({status: "error, invalid parameters"})
    }
}
