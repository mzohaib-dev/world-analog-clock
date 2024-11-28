import React, { useState, useEffect, useRef } from "react";
import "./assets/css/DropDown.css";

const DropdownWithSearch = ({ options, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="dropdown-select" ref={dropdownRef} tabIndex="0">
      <div
        className={`current ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected.label : placeholder}
      </div>
      {isOpen && (
        <div className="list">
          <div className="dd-search">
            <input
              className="dd-searchbox"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul>
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className={`option ${
                  selected?.value === option.value ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
                data-value="2"
                data-display-text=""
                 tabindex="0"
              >
                {option.flag } { option.label}
              </li>

            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownWithSearch;
