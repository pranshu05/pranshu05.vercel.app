const Footer: React.FC = () => (
    <footer className="flex flex-col font-medium w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto my-4">
        <hr className="border-t-2 border-[#f9e2af] mt-4" />
        <div className="flex flex-row items-center pt-2 justify-between">
            <p className="text-[#89b4fa]">© {new Date().getFullYear()} </p>
            <a href="https://github.com/pranshu05" target="_blank" rel="noopener noreferrer" className="link text-[#b4befe]">Pranshu Patel</a>
        </div>
    </footer>
);

export default Footer;