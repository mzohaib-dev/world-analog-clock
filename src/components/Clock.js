import React, { useEffect, useState } from "react";
import "./assets/css/clock.css";  // Import the CSS file to style this component
import { Country, State, City }  from 'country-state-city';
import CustomDropdown from "./CustomDropdown";
const Clock = () => {
  const [time, setTime] = useState({
    dayName: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: "AM",
    day: 0,
    month: 0,
    year: 0
  });

  const [theme, setTheme] = useState({
    selectedTheme: localStorage.getItem("selected-theme") || "light",
    selectedIcon: localStorage.getItem("selected-icon") || "bxs-sun"
  });

  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Update the clock every second
    const clock = () => {
      let date = new Date();
      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss = date.getSeconds();
      let ampm = hh >= 12 ? "PM" : "AM";

      // Format the hours in 12-hour format
      if (hh >= 12) {
        hh = hh - 12;
      }
      if (hh === 0) {
        hh = 12;
      }
      if (hh < 10) {
        hh = `0${hh}`;
      }

      // Ensure minutes are always two digits
      if (mm < 10) {
        mm = `0${mm}`;
      }
      if (ss < 10) {
        ss = `0${ss}`;
      }

      // Set the time
      setTime({
        dayName : date.getDay(),
        hours: hh,
        minutes: mm,
        seconds: ss,
        ampm: ampm,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      });
    };

    clock();
    const interval = setInterval(clock, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const cities = Country.getAllCountries();
    const cityOptions = cities.map((city) => ({
      value: `${city.name.toLowerCase().replace(/\s+/g, "_")}_${city.isoCode}`, 
      label: city.name,
      flag: city.flag,
    }));
    setOptions(cityOptions);
  }, []);

  useEffect(() => {
    // Set the theme based on localStorage or default
    document.body.classList.toggle("dark-theme", theme.selectedTheme === "dark");
    document.getElementById("theme-button").classList.toggle("bxs-sun", theme.selectedIcon === "bxs-sun");
    document.getElementById("theme-button").classList.toggle("bxs-moon", theme.selectedIcon === "bxs-moon");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme.selectedTheme === "dark" ? "light" : "dark";
    const newIcon = newTheme === "dark" ? "bxs-moon" : "bxs-sun";
    setTheme({ selectedTheme: newTheme, selectedIcon: newIcon });
    localStorage.setItem("selected-theme", newTheme);
    localStorage.setItem("selected-icon", newIcon);
  };

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <section className="clock container">
      <div className="clock__container grid">
        <div className="clock__content grid">
          <div className="container-dropdown">
              <CustomDropdown options={options} />
          </div>
          <div className="clock__circle">
            <span className="clock__twelve"></span>
            <span className="clock__three"></span>
            <span className="clock__six"></span>
            <span className="clock__nine"></span>

            <div className="clock__rounder"></div>
            <div
              className="clock__hour"
              style={{
                transform: `rotateZ(${(time.hours * 30) + (time.minutes / 12)}deg)`
              }}
            ></div>
            <div
              className="clock__minutes"
              style={{
                transform: `rotateZ(${time.minutes * 6}deg)`
              }}
            ></div>
            <div
              className="clock__seconds"
              style={{
                transform: `rotateZ(${time.seconds * 6}deg)`
              }}
            ></div>

            <div className="clock__theme" onClick={toggleTheme}>
              <i
                className={`bx ${theme.selectedIcon}`}
                id="theme-button"
              ></i>
            </div>
          </div>

          <div>
            <div className="clock__text">
              <div className="clock__text-hour">{time.hours}:</div>
              <div className="clock__text-minutes">{time.minutes}</div>
              <div className="clock__text-ampm">{time.ampm}</div>
            </div>

            <div className="clock__date">
            <span>{days[time.dayName]}</span>
              <span>{time.day}</span>
              <span>{months[time.month]}</span>
              <span>{time.year}</span>
            </div>
          </div>
        </div>

        {/* <a
          href="https://github.com/mzohaib-dev/world-analog-clock.git"
          target="_blank"
          rel="noopener noreferrer"
          className="clock__logo"
        >
          github.com/mzohaib-dev
        </a> */}
      </div>
    </section>
  );
};

export default Clock;
