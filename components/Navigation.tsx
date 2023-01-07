import {signIn, useSession} from "next-auth/react";
import AdminNavigation from "./AdminNavigation";
import {useState} from "react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";

interface Props {
    home: boolean
}

const Navigation = ({home}: Props) => {
    const {data: session} = useSession()
    const [open, setOpen] = useState(false)

    return (
        <div className={"select-none"}>
            <div className={"flex justify-center"}>
                <button onClick={() => setOpen(!open)} >
                    {open ? <ChevronUpIcon className={"h-6 w-6 text-light"} /> : <ChevronDownIcon className={"h-6 w-6 text-light"} />}
                </button>
            </div>
            <nav className={`transition-all duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
                <ul className={"font-bold text-lg justify-center items-center flex flex-col md:flex-row"}>
                    {home ?
                        <li className={"mx-2"}>
                            <a href={"/"} className={"text-light drop-shadow-lg hover:text-light-highlight"}>Home</a>
                        </li>
                        : null
                    }
                    <li className={"mx-2"}>
                        <a href={"https://discord.gg/dennies"} target={"_blank"} rel={"noreferrer"} className={"text-light drop-shadow-lg hover:text-light-highlight"}>Join</a>
                    </li>
                    <li className={"mx-2"}>
                        <a href={"https://discord.com/channels/709915012000382996/740979281206968390"} target={"_blank"} rel={"noreferrer"} className={"text-light drop-shadow-lg hover:text-light-highlight"}>Rules</a>
                    </li>
                    {session ? (
                        <li className={"mx-2"}>
                            <a href={"/profile"} className={"text-light drop-shadow-lg hover:text-light-highlight"}>Profile</a>
                        </li>
                    ) : (
                        <li className={"mx-2"}>
                            <a onClick={() => signIn()} className={"text-light drop-shadow-lg hover:text-light-highlight"}>Sign In</a>
                        </li>
                    )}
                    <AdminNavigation />
                </ul>
            </nav>
        </div>
    )
}

export default Navigation
