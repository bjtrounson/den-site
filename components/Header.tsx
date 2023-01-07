import Image from "next/image";

interface Props {
    children: JSX.Element
}

const Header = ({children}: Props) => {
    return (
        <div className={"flex flex-col w-full bg-minecraft-background select-none items-center justify-center pt-auto"}>
            <Image className={"mx-auto"} width={343} height={253} src={"/den-logo-transparent.png"} alt={"The Den logo"} />
            <h1 className={"font-bold text-3xl text-light text-center"}>Discord Community</h1>
            {children}
        </div>
    )
}

export default Header
