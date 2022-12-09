import React from 'react';

function EditDestination({editDest, handleEditForm, selectedDest}) {

  function handleInputChange(e) {
    handleEditForm(e.target.name, e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:9292/destinations/${selectedDest.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(selectedDest),
    })
    .then(r => r.json())
    .then(editDest)
}

const {city_name, img_url, country_name, continent} = selectedDest
console.log(selectedDest)

  return (
    <div>
      <div className="edit_destination">
      <form className="edit_form" 
      onSubmit={handleSubmit}
      >
        <input
          className="edit_city_name"
          type="text"
          name="city_name"
          value={city_name}
          onChange={handleInputChange}
          placeholder="Edit City"
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
          placeholder="Edit Country"
        ></input>
        <label htmlFor="continents">Pick a New Continent:</label>
        <select
        className='drop'
          name="continent"
          value={continent?.continent_name}
          onChange={handleInputChange}
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