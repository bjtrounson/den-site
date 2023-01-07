import Image from "next/image";
import {signIn, signOut, useSession} from "next-auth/react";
import AdminNavigation from "../components/AdminNavigation";
import Navigation from "../components/Navigation";
import Header from "../components/Header";

const ModifyServers = () => {
    const { data: session } = useSession()

    if (session) {
        return (
            <div className={"lg:h-screen h-full bg-gradient-to-br from-gradient-light to-gradient-dark flex flex-col items-center pb-4"}>
                <Header>
                    <Navigation home={true} />
                </Header>
                <div className={"w-[320px] my-auto"}>
                    <div className={"border-light border-2 rounded-lg flex-col drop-shadow-2xl"}>
                        <div className={"row"}>
                            <div className={"bg-dark p-4 rounded-2xl hover:bg-gradient-to-br from-dark to-gradient-light hover:shadow-2xl"}>
                                <div className={"flex flex-row"}>
                                    <Image className={"rounded-full h-full self-center"} width={48} height={48} src={session.user.image as string} alt={"The Den logo"} />
                                    <div className={"ml-4"}>
                                        <h1 className={"font-bold text-light text-xl"}>{session.user.name}</h1>
                                        <h3 className={"text-light text-md"}>{session.user.email}</h3>
                                        <div className={"flex flex-row"}>
                                            <h3 className={"text-light text-md mr-2"}>Role:</h3>
                                            <h4 className={"text-light font-bold text-md uppercase"}>{session.user.role}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex mt-5 justify-center"}>
                                    <button
                                        className={"bg-light text-dark rounded-2xl p-2"}
                                        onClick={() => signOut()}
                                    >Sign Out
                                    </button>
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
