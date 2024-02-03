export const Footer = () => {
    const year  = new Date().getFullYear();

    return(
        <footer className="flex flex-col font-medium">
            <hr className="border-t-2 w-full border-zinc-800 mt-4"></hr>
            <div className="flex flex-row items-center pt-2 justify-between">
                <div className="flex flex-row items-center">
                    <p className="text-zinc-400">© {year}{" "}</p>
                    <p className="text-zinc-400">| Made with ❤️ by <a href="https://github.com/pranshu05" target="_blank" className="link">Pranshu Patel</a></p>
                </div>
            </div>
        </footer>
    )
}