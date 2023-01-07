import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {signIn, signOut, useSession} from "next-auth/react";
import AdminNavigation from "../components/AdminNavigation";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import {useQuery} from "@tanstack/react-query";
import Server from "../interfaces/Server";
import ServerList from "../components/ServerList";
import {ServerStatus} from "../interfaces/ServerStatus";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const { data: session } = useSession()

    return (
      <div className={"lg:h-screen h-full bg-gradient-to-b from-gradient-light via-gradient-light to-gradient-dark flex flex-col items-center pb-4"}>
          <Header>
              <Navigation home={false} />
          </Header>
          <div className={"md:w-1/2 my-6 lg:my-auto"}>
                <ServerList />
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
