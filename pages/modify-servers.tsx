import Image from "next/image";
import {signIn, signOut, useSession} from "next-auth/react";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import {ChangeEvent, KeyboardEvent, useState} from "react";

const ModifyServers = () => {
    const { data: session } = useSession({required: true})
    const [name, setName] = useState("")
    const [ip, setIp] = useState("")
    const [game, setGame] = useState("")
    const [version, setVersion] = useState("")
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState("")
    const [error, setError] = useState("")

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
        }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        // If user did not press enter key, return
        if(e.key !== 'Enter') return
        // Get the value of the input
        // @ts-ignore
        const value = e.target.value
        // If the value is empty, return
        if(!value.trim()) return
        // Add the value to the tags array
        setTags([...tags, value])
        // Clear the input
        // @ts-ignore
        e.target.value = ''
    }

    const handleDelete = (index: number) => {
        // Filter out the tag that was clicked
        setTags(tags.filter((_, i) => i !== index))
    }

    const handleAddServer = async () => {
        await fetch(`/api/server/add`, {
            method: "POST",
            body: JSON.stringify({name, ip, tags, game, version, image})
        }).catch(err => setError(err.message))
    }

    if (session && session.user.role === "admin" || session && session.user.role === "super") {
        return (
            <div className={"lg:h-screen h-full bg-gradient-to-br from-gradient-light to-gradient-dark flex flex-col items-center pb-4"}>
                <Header>
                    <Navigation home={true} />
                </Header>
                <div className={"my-auto"}>
                    <h1 className={"text-light font-bold text-2xl"}>Add Servers</h1>
                    <div className={"border-light border-2 rounded-lg flex-col drop-shadow-2xl"}>
                        <div className={"row"}>
                            <div className={"bg-dark p-4 rounded-2xl"}>
                                <div className={"lg:columns-4 sm:columns-2"}>
                                    <div>
                                        <h1 className={"font-bold text-light text-xl"}>Name</h1>
                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            className={"text-light mt-2 rounded-2xl p-2 bg-dark border-2 border-light caret-light"}
                                            type={"text"}
                                            placeholder={"Server Name"}
                                        />
                                    </div>
                                    <div>
                                        <h1 className={"font-bold text-light text-xl"}>IP</h1>
                                        <input
                                            onChange={(e) => setIp(e.target.value)}
                                            className={"text-light mt-2 rounded-2xl p-2 bg-dark border-2 border-light caret-light"}
                                            type={"text"}
                                            placeholder={"Server IP"}
                                        />
                                    </div>
                                    <div>
                                        <h1 className={"font-bold text-light text-xl"}>Version</h1>
                                        <input
                                            onChange={(e) => setVersion(e.target.value)}
                                            className={"text-light mt-2 rounded-2xl p-2 bg-dark border-2 border-light caret-light"}
                                            type={"text"}
                                            placeholder={"Server Version"}
                                        />
                                    </div>
                                    <div>
                                        <h1 className={"font-bold text-light text-xl"}>Game</h1>
                                        <input
                                            onChange={(e) => setGame(e.target.value)}
                                            className={"text-light mt-2 rounded-2xl p-2 bg-dark border-2 border-light caret-light"}
                                            type={"text"}
                                            placeholder={"Game"}
                                        />
                                    </div>
                                </div>
                                <div className={"lg:flex flex-row mt-2"}>
                                    <div className={" max-w-[320px]"}>
                                        <h1 className={"font-bold text-light text-xl"}>Server Icon</h1>
                                        <input
                                            type={"file"}
                                            className={"mt-2 rounded-2xl p-2 bg-dark text-light font-bold border-light border-2 hover:bg-gradient-to-br from-dark to-gradient-light hover:shadow-2xl"}
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                    <div className={"lg:ml-4 max-w-[402px]"}>
                                        <h1 className={"font-bold text-light text-xl"}>Tags</h1>
                                        <div className={"flex flex-wrap items-center"}>
                                            <input className={"rounded-2xl mt-2 p-2 bg-dark border-2 border-light caret-light text-light"} onKeyDown={handleKeyDown} type={"text"} placeholder={"Server Tags"}/>
                                            { tags.map((tag, index) => (
                                                <div className={"my-1 mx-2 border-light border-2 rounded-2xl p-1 px-2 my-auto"} key={index}>
                                                    <span className={"font-bold text-light text-sm"}>{tag}</span>
                                                    <a onClick={() => handleDelete(index)} className={"ml-1 font-bold text-light text-sm"}>&times;</a>
                                                </div>
                                            )) }
                                        </div>
                                    </div>

                                    {error ? <p className={"text-red-500"}>{error}</p> : null}
                                    <div className={"flex justify-center mx-4 mt-4 lg:mt-auto lg:ml-auto"}>
                                        <button
                                            onClick={handleAddServer}
                                            className={"rounded-2xl p-2 bg-dark text-light font-bold border-light border-2 hover:bg-gradient-to-br from-dark to-gradient-light hover:shadow-2xl"}
                                        >
                                            Add Server
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className={"flex flex-row items-center justify-center mt-auto"}>
                        <h3 className={"text-light text-md"}>Made with ❤️ by <a className={"text-light-highlight"} href={"https://dennies.xyz"}>Dennies</a></h3>
                    </div>
                    <div className={"flex flex-row items-center justify-center"}>
                        <h4 className={"text-light text-md"}>© 2023 The Den</h4>
                    </div>
                </footer>
            </div>
        )
    }

    return (
        <div>
            <h1>You are not authorized to view this page!</h1>
        </div>
    )
}

export default ModifyServers
