// Next.js API Route TypeScript
import { NextApiRequest, NextApiResponse } from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]"
import prisma from "../../../lib/prismadb"

export const config = {
    api: {
        bodyParser: true
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // get body params from request
    const {name, ip, version, game, tags, image} = JSON.parse(req.body)
    console.log({name, ip, version, game, tags})
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session && session.user.role === "admin" || session && session.user.role === "super") {
        // if user is logged in and has admin or super role, add server to database using primsa client
        // create defaults for optional fields
        // null check name, ip, game, version
        if (name && ip && game && version) {
            const server = await prisma.server.create({
                data: {
                    name: name as string,
                    ip: ip as string,
                    game: game as string,
                    version: version as string,
                    tags: tags ? tags as string[] : [],
                    image: image ? image.toString() : ""
                }
            })
            res.status(200).json({status: "success, server added", server})
        } else {
            res.status(400).json({status: "error, invalid parameters"})
        }
    } else {
        res.status(403).json({status: "error, not authorized"})
    }
}
