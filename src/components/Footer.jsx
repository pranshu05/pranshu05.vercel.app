export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="flex flex-col font-medium w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto my-10">
            <hr className="border-t-2 w-full border-zinc-800 mt-4"></hr>
            <div className="flex flex-row items-center pt-2 justify-between">
                <p className="text-zinc-400">© {year}{" "}</p>
                <p className="text-zinc-400"><a href="https://github.com/pranshu05" target="_blank" className="link">Pranshu Patel</a></p>
            </div>
        </footer>
    )
}