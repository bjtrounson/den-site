import {useQuery} from "@tanstack/react-query";
import Server from "../interfaces/Server";
import Image from "next/image";
import {ServerStatus} from "../interfaces/ServerStatus";
import getMinecraftStatus from "../utils/getMinecraftStatus";

const serverStyle = (serverLength: number | undefined, index: number) => {
    if (serverLength) {
        if (index === 0) return "rounded-t-2xl border-b-2 border-light"
        if (serverLength === index + 1 && serverLength != 1) return "rounded-b-2xl"
        else return "rounded-none border-b-2 border-light"
    } else return ""
}

const ServerList = () => {
    const {data: servers} = useQuery(["servers"], async () => { return await fetch("/api/server")
        .then(res => res.json() as Promise<{status: string, servers: Server[]}>).then(data => data.servers) })
    const {data: serverStatus, isLoading} = useQuery(["serverData"], async () => { return await getMinecraftStatus(servers ? servers.map(server => server.ip) : [])}, {enabled: !!servers})

    if (isLoading) return <div className={"flex flex-row items-center justify-center"}><h1 className={"text-light text-2xl"}>Loading...</h1></div>

    return (
        <div className={"border-light border-2 rounded-lg flex-col drop-shadow-2xl "}>
            {servers?.map((server, index) => (
                <div key={index} className={"row"}>
                    <div className={`flex flex-row bg-dark p-4 ${serverStyle(servers.length, index)} hover:bg-gradient-to-br from-dark to-gradient-light hover:shadow-2xl`}>
                        <div className={"flex flex-col items-center justify-center"}>
                            <Image width={48} height={48} src={server.image ? server.image : "/minecraft-icon.png"} alt={"The Den logo"} />
                        </div>
                        <div className={"flex flex-col grow ml-4"}>
                            <div className={"flex flex-row"}>
                                <h1 className={"font-bold text-light text-xl grow"}>{server.name}</h1>
                                <div className={"flex flex-row items-center"}>
                                    <h4 className={"text-light text-bold mr-3"}>{serverStatus?.[index]?.online ? "Online" : "Offline"}</h4>
                                    <div className={`p-3 rounded-full ${serverStatus?.[index]?.online ? "bg-light-highlight" : "bg-red-900"}`}/>
                                </div>
                            </div>
                            <div className={"flex flex-row"}>
                                <div className={"flex-col mt-auto"}>
                                    <h3 className={"text-light text-md"}>{serverStatus?.[index] ? serverStatus?.[index]?.hostname : server.ip}</h3>
                                    <h2 className={"text-light text-sm"}>{serverStatus?.[index]?.version ? `${server.game} | ${serverStatus?.[index]?.version}` : `${server.game} | ${server.version}`}</h2>
                                </div>
                                <div className={"flex-col ml-auto mt-auto"}>
                                    {serverStatus?.[index]?.players ?
                                        <div className={"flex flex-row justify-end my-1"}>
                                            <h4 className={"text-light text-bold"}>{serverStatus?.[index].players?.online} / {serverStatus?.[index].players?.max}</h4>
                                            <h3 className={"text-light text-md ml-2"}>Players</h3>
                                        </div> : null
                                    }
                                    <div className={"mt-auto flex justify-end flex-wrap"}>
                                        {server.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className={`text-light text-sm bg-dark border-light border-2 rounded-full py-1 px-2 ml-1 mt-1`}
                                            >
                                        {tag}
                                    </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default ServerList
