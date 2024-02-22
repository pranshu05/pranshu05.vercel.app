const Footer: React.FC = () => (
    <footer className="flex flex-col font-medium w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto my-4">
        <hr className="border-t-2 border-zinc-800 mt-4" />
        <div className="flex flex-row items-center pt-2 justify-between">
            <p className="text-zinc-400">© {new Date().getFullYear()} </p>
            <a href="https://github.com/pranshu05" target="_blank" rel="noopener noreferrer" className="link text-zinc-400">Pranshu Patel</a>
        </div>
    </footer>
);

export default Footer;