import { Tech } from "./Technologies";
import { useState, useEffect } from "react";

export const AboutMe = () => {
  const birthdate = new Date("2005-10-04");
  const ageInYears = Math.floor(
    (new Date() - birthdate) / (1000 * 60 * 60 * 24 * 365)
  );
  const ageInPoints = (new Date() - birthdate) / (1000 * 60 * 60 * 24 * 365);
  const ageFormatted = ageInPoints.toFixed(7);

  const [codingHours, setCodingHours] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://wakatime.com/api/v1/users/pranshu05/stats"
      );
      const data = await response.json();
      setCodingHours(Math.floor(data.data.grand_total.total_seconds / 3600));
    };
    fetchData();
  }, []);

  return (
    <div className="about-me" id="about-me">
      <h2> Hi! I'm Pranshu ✌️</h2>
      <p>
        I'm a {ageFormatted} y/o high school student and self-taught developer
        from India. I started coding when I was 14 during the COVID lockdown and
        have gained expertise in creating Discord bots using{" "}
        <a href="https://discord.js.org/#/">discord.js</a> as well as web
        development. Along the way, I've learned various programming languages.
        According to my Wakatime stats, I've spent {codingHours} hours coding so
        far.
      </p>
      <br />
      <h2>What Do I Do 💭</h2>
      <p>
        I am passionate about everything related to technology, including
        designing and developing software, understanding the various components
        of the internet and how they work together, cybersecurity, systems,
        programming, and more. I am constantly striving to expand my knowledge
        in these areas and apply it to gain a deeper understanding of the
        technology that surrounds us.
      </p>
      <br />
      <Tech />
      <br />
    </div>
  );
};
