import Image from "next/image";

export default function Home() {
  const currentDate = new Date();
  const birthDate = new Date("2005-10-04");
  const ageInMilliseconds = currentDate - birthDate;
  const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));

  return (
    <div className="h-full w-full p-0 m-0">
      <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto mt-32">
        <h1 className="text-2xl font-semibold">Pranshu Patel</h1>
        <p className="text-lg text-gray-500">{ageInYears}y/o Developer, India</p>
      </div>
    </div>
  );
}
