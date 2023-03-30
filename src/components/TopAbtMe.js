import { useState, useEffect } from "react";

export const TopAbtMe = () => {

    const [temp, setTemp] = useState(null);

    useEffect(() => {
        fetch("http://api.weatherapi.com/v1/current.json?key=c39ef2dad5e24511884124359232903&q=Gandhinagar&aqi=no")
        .then((response) => response.json())
        .then((results) => {
            setTemp(results.current.temp_c);
        });
    }, []);

    return(
        <div className="top-abt-me">
            <h1> Hi! I'm Pranshu ✌️</h1>
            <p>
                I am a developer and high-school student based in India. I specialize in creating discord bots using <a href="https://discord.js.org/#/">discord.js</a> and web development. 
                ☁️ Currently 🌡️ {temp !== null ? temp : "Loading..."} °C out here
            </p>
        </div>
    )
}