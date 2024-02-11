import { ageInYears } from "../lib/AgeInYears";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Home() {
  return (
    <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto mt-32">
      <div className="pb-8">
        <div className="flex items-baseline">
          <h1 className="text-3xl font-medium">Pranshu Patel</h1>
          <p className="text-sm px-1 text-zinc-400">(He/Him)</p>
        </div>
        <p className="text-zinc-400">{ageInYears}y/o Developer, India</p>
      </div>
      <p className="text-zinc-400">
        Hey there! 👋 I&apos;m Pranshu, a fullstack developer based in India. I&apos;m currently working on a few projects. I&apos;m also a student, and I&apos;m currently pursuing B.Tech. in ICT from <a className="link" href="https://daiict.ac.in" target="_blank">DA-IICT</a>.
      </p>
      <div className="my-4 grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-4 mx-auto">
        <div className=" outline outline-1 outline-zinc-400 rounded-lg p-2">
          <a href="https://github.com/pranshu05" target="_blank" className="link flex items-center justify-center"><FaGithub className="mr-2" /> GitHub</a>
        </div>
        <div className=" outline outline-1 outline-zinc-400 rounded-lg p-2">
          <a href="https://linkedin.com/in/pranshu05" target="_blank" className="link flex items-center justify-center"><FaLinkedin className="mr-2" /> Linkedin</a>
        </div>
        <div className=" outline outline-1 outline-zinc-400 rounded-lg p-2">
          <a href="https://twitter.com/pranshu_05" target="_blank" className="link flex items-center justify-center"><FaTwitter className="mr-2" /> Twitter</a>
        </div>
        <div className=" outline outline-1 outline-zinc-400 rounded-lg p-2">
          <a href="https://instagram.com/pranshu.05" target="_blank" className="link flex items-center justify-center"><FaInstagram className="mr-2" /> Instagram</a>
        </div>
      </div>
    </div>
  );
}