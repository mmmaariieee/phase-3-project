import React, { useState } from 'react';

function EditDestination({patchedDestination}) {

  const [formData, setFormData] = useState({
    city_name: "",
    image_url: "",
    country_name: "",
    continent_id: "",
  });

  function handleUpdateChange(e) {
    console.log(e.target.value)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleUpdateSubmit(e) {
    e.preventDefault()
    const updatedDestination = {
      city_name: formData.city_name,
      image_url: formData.image_url,
      country_name: formData.country_name,
      continent: formData.continent_id,
    };

    fetch("http://localhost:9292/destinations", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDestination),
    })
      .then((r) => r.json())
      .then((data) => patchedDestination(data));
  }

  return (
    <div>
      <div className="edit_destination">
      <form className="edit_form" onSubmit={handleUpdateSubmit}>
        <input
          className="edit_city_name"
          type="text"
          name="city_name"
          value={formData.city_name}
          placeholder="Edit City Name"
          onChange={handleUpdateChange}
        ></input>
        <input
          className="edit_image_url"
          type="text"
          name="image_url"
          value={formData.image_url}
          placeholder="Edit Image URL"
          onChange={handleUpdateChange}
        ></input>
        <input
          className="edit_country_name"
          type="text"
          name="country_name"
          value={formData.country_name}
          placeholder="Edit Country Name"
          onChange={handleUpdateChange}
        ></input>
        <label for="continents">Pick a New Continent:</label>
        <select
          name="continent"
          value={formData.continent}
          onChange={handleUpdateChange}
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
        <button className="edit_destination_button" type="submit">
          Update
        </button>
      </form>
    </div>
    </div>
  )
}
export default EditDestination;