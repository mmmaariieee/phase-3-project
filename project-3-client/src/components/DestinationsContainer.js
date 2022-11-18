import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import OrderBy from "./OrderBy";
import Destination from "./Destination";
import Filter from "./Filter";
import EditDestination from "./EditDestination";

function DestinationsContainer({ destinations, setDestinations, deleteDestination, patchedDestination }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null)


  const filteredDestinations = destinations
  .filter((destination) =>
    destination.city_name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((destination) => {
    if (selectedCategory === "All") return true;

    return destination.continent?.continent_name === selectedCategory;
  });

  const eachDestination = filteredDestinations.map((destination) => (
    <Destination handleDelete={handleDelete} destination={destination} key={destination.id} />
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

  function handleEditDestination() {
    const updatedDestination = destinations.map((destination) =>
      destination.id === updatedDestination.id ? updatedDestination : destination
    );
    setSelectedDestination(updatedDestination);
    setDestinations(updatedDestination);
  }

  return (
    <div>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <SearchFilter search={search} handleSearch={handleSearch} />
      <EditDestination patchedDestination={patchedDestination}/>
      <OrderBy />
      <div className='destinationsDiv'>
        {eachDestination}
      </div>
    </div>
  );
}

export default DestinationsContainer;
