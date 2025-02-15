import React, { useState } from "react";

function AddDestinationsForm({ postedDestination }) {
  const [formData, setFormData] = useState({
    city_name: "",
    img_url: "",
    country_name: "",
    continent: "",
  });

  function handleChange(e) {
    console.log(e.target.value)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  function handleSubmit() {
    const addedDestination = {
      city_name: formData.city_name,
      img_url: formData.img_url,
      country_name: formData.country_name,
      continent: formData.continent,
    };

    fetch("http://localhost:9292/destinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedDestination),
    })
      .then((r) => r.json())
      .then((data) => postedDestination(data));
  }

  return (
    <div className="destination_form">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="city_name"
          type="text"
          name="city_name"
          placeholder="Add City Name"
          value={formData.city_name}
          onChange={handleChange}
        ></input>
        <input
          className="image_url"
          type="text"
          name="img_url"
          placeholder="Add Image URL"
          value={formData.img_url}
          onChange={handleChange}
        ></input>
        <input
          className="country_name"
          type="text"
          name="country_name"
          placeholder="Add Country Name"
          value={formData.country_name}
          onChange={handleChange}
        ></input>
        <label htmlFor="continents">Pick a Continent:</label>
        <select
        className="add_continent"
          name="continent"
          value={formData.continent}
          onChange={handleChange}
        >
          <optgroup label="Continents">
            <option>North America</option>
            <option>South America</option>
            <option>Europe</option>
            <option>Africa</option>
            <option>Asia</option>
            <option>Oceania</option>
            <option>Antarctica</option>
          </optgroup>
        </select>
        <button className="add_destination" type="submit">
          Add Destination
        </button>
      </form>
    </div>
  );
}

export default AddDestinationsForm;
