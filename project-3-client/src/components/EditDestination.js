import React, {useState} from 'react';

function EditDestination( { id, patchedDestination, currentDestination } ) {
  const [formData, setFormData] = useState({
    city_name: "",
    img_url: "",
    country_name: "",
    continent: "",
  });
console.log(currentDestination)

console.log(formData)

  function handleChange(e) {
    console.log(e.target.value)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit() {
    const updatedDestination = {
      city_name: formData.city_name,
      img_url: formData.img_url,
      country_name: formData.country_name,
      continent: formData.continent,
    };

    fetch(`http://localhost:9292/destinations/${id}`, {
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
      <form className="edit_form" onSubmit={handleSubmit}
      >
        <input
          className="edit_city_name"
          type="text"
          name="city_name"
          value={formData.city_name}
          onChange={handleChange}
          placeholder="Edit City Name"
        ></input>
        <input
          className="edit_image_url"
          type="text"
          name="img_url"
          value={formData.img_url}
          onChange={handleChange}
          placeholder="Edit Image URL"
        ></input>
        <input
          className="edit_country_name"
          type="text"
          name="country_name"
          value={formData.country_name}
          onChange={handleChange}
          placeholder="Edit Country Name"
        ></input>
        <label for="continents">Pick a New Continent:</label>
        <select
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
        <button className="edit_destination_button" type="submit">
          Update
        </button>
      </form>
    </div>
    </div>
  )
}
export default EditDestination;