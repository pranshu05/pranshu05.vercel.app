import { Footer } from "../components/footer";
import { ageInYears } from "../lib/ageInYears";

export default function Home() {
  return (
    <div className="h-full w-full p-0 m-0">
      <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-2/5 mx-auto mt-32">
        <div className="flex items-baseline">
          <h1 className="text-xl font-medium">Pranshu Patel</h1>
          <p className="text-sm px-1 text-zinc-400">(He/Him)</p>
        </div>
        <p className="text-zinc-400">{ageInYears}y/o Developer, India</p>
        <p className="mt-10 text-zinc-400">
          Hey there! 👋 I&apos;m Pranshu, a fullstack developer based in India. I&apos;m currently working on a few projects. I&apos;m also a student, and I&apos;m currently pursuing B.Tech. in ICT from <a className="link" href="https://daiict.ac.in" target="_blank">DA-IICT</a>.
        </p>
        <div className="my-4 grid grid-flow-col sm:grid-cols-2 gap-2 sm:gap-4">
          <div className="flex flex-row items-center backdrop backdrop-blur-sm outline outline-1 outline-zinc-400 rounded-lg p-2">
            <img src="https://avatars.githubusercontent.com/u/70943732?v=4" alt="GitHub" className="rounded-full w-0 sm:w-[20%]" ></img>
            <div className="flex flex-col sm:ml-2 align-center text-center w-full sm:w-[80%]">
              <a href="https://github.com/pranshu05" target="_blank" className="link">@pranshu05</a>
              <p className="text-zinc-400">Checkout my GitHub</p>
            </div>
          </div>
          <div className="flex flex-row items-center backdrop backdrop-blur-sm outline outline-1 outline-zinc-400 rounded-lg p-2">
            <img src="https://pbs.twimg.com/profile_images/1746581867095302144/grYJiUYL_400x400.jpg" alt="Twitter" className="rounded-full w-0 sm:w-[20%]" ></img>
            <div className="flex flex-col sm:ml-2 align-center text-center w-full sm:w-[80%]">
              <a href="https://twitter.com/pranshu_05" target="_blank" className="link">@pranshu_05</a>
              <p className="text-zinc-400">Follow me on Twitter</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
