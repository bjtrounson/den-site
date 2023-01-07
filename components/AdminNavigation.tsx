import {signOut, useSession} from "next-auth/react";

const AdminNavigation = () => {
    const {data: session} = useSession()

    if (session && session.user.role === "admin" || session && session.user.role === "super") { return (
        <>
            <li className={"mx-2"}>
                <a href={"/modify-servers"} className={"text-light drop-shadow-lg hover:text-light-highlight"}>Modify Servers</a>
            </li>
            {session?.user.role === "super" ? (
                <li className={"mx-2"}>
                    <a href={"/modify-roles"} className={"text-light drop-shadow-lg hover:text-light-highlight"}>Modify Roles</a>
                </li> ) : null
            }
        </>
    ) } else return null
}

export default AdminNavigation
