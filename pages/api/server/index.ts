// Next.js API Route TypeScript
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prismadb"

export default (req: NextApiRequest, res: NextApiResponse) => {
    // query all server data from database using prisma client
    prisma.server.findMany().then((servers) => {
        res.status(200).json({status: "success", servers})
    }).catch((err) => {
        res.status(500).json({status: "error", message: err})
    })
}
