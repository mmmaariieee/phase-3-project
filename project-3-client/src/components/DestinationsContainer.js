import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import Destination from "./Destination";
import Filter from "./Filter";


function DestinationsContainer({ destinations, deleteDestination, editDest, handleEditForm, selectedDest, setSelectedDest }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // console.log(currentDestination)

  const filteredDestinations = destinations
  .filter((destination) =>
    destination.city_name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((destination) => {
    if (selectedCategory === "All") return true;

    return destination.continent?.continent_name === selectedCategory;
  });

  const eachDestination = filteredDestinations.map((destination) => (
    <Destination setSelectedDest={setSelectedDest} editDest={editDest} handleEditForm={handleEditForm} selectedDest={selectedDest} handleDelete={handleDelete} destination={destination} key={destination.id} />
  ));


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleDelete(id) {
    fetch(`http://localhost:9292/destinations/${id}`, {
      method: "DELETE",
    }).then(() => deleteDestination(id));
  }

  return (
    <div>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <SearchFilter search={search} handleSearch={handleSearch} />
      {/* <EditDestination
      destination={destination}
      currentDestination={currentDestination}
      setCurrentDestination={setCurrentDestination}
      handleChange={handleChange}
      /> */}
      <div className='destinationsDiv'>
        {eachDestination}
      </div>
    </div>
  );
}

export default DestinationsContainer;
