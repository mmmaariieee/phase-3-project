import React from 'react';

function EditDestination({destination, onChangeForm, onEditDestination}) {

  function handleInputChange(e) {
    onChangeForm(e.target.name, e.target.value);
  }

  function handleSelectChange(e) {
    onChangeForm(e.target.name, e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9292/destinations/${destination.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(destination),
    })
      .then((r) => r.json())
      .then(onEditDestination);
  }

  if (!destination) return null

  const { city_name, country_name, continent, img_url } = destination


  return (
    <div>
      <div className="edit_destination">
      <form className="edit_form" onSubmit={handleSubmit}>
        <input
          className="edit_city_name"
          type="text"
          name="city_name"
          value={city_name}
          onChange={handleInputChange}
          placeholder="Edit City Name"
        ></input>
        <input
          className="edit_image_url"
          type="text"
          name="img_url"
          value={img_url}
          onChange={handleInputChange}
          placeholder="Edit Image URL"
        ></input>
        <input
          className="edit_country_name"
          type="text"
          name="country_name"
          value={country_name}
          onChange={handleInputChange}
          placeholder="Edit Country Name"
        ></input>
        <label for="continents">Pick a New Continent:</label>
        <select
          name="continent"
          value={continent}
          onChange={handleSelectChange}
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