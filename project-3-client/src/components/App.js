import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DestinationsContainer from "./DestinationsContainer";
// import FavoriteDestinations from "./FavoriteDestinations";
import AddDestinationsForm from "./AddDestinationsForm";
import NavBar from "./NavBar";
import AddReviewForm from "./AddReviewForm";
import EditDestination from "./EditDestination";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null)

  useEffect(() => {
    fetch("http://localhost:9292/destinations")
      .then((r) => r.json())
      .then((data) => setDestinations(data));
  }, []);

  function handleChangeForm(name, value) {
    setSelectedDestination({
      ...selectedDestination,
      [name]: value,
    });
  }

  function handleEditDestination(updatedDestination) {
    const updatedDestinations = destinations.map((destination) =>
      destination.id === updatedDestination.id ? updatedDestination : destination
    );
    setSelectedDestination(updatedDestination);
    setDestinations(updatedDestinations);
  }

  function postedDestination(addedDestination) {
    setDestinations([...destinations, addedDestination]);
  }

  function postedReview(addedReview) {
    setReviews([...reviews, addedReview])
  }

  function deleteDestination(id) {
    const newDestinations = destinations.filter(
      (destination) => destination.id !== id
    );
    setDestinations(newDestinations);
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DestinationsContainer
                destinations={destinations}
                destination={selectedDestination}
                deleteDestination={deleteDestination}
                onChangeForm={handleChangeForm}
                onEditDestination={handleEditDestination}
                onSelectDestination={setSelectedDestination}
              />
            </>
          }
        />
        <Route
          path="/add_new_destinations"
          element={
            <AddDestinationsForm postedDestination={postedDestination} />
          }
        />
        <Route
          path="/add_new_reviews"
          element={
            <AddReviewForm postedReview={postedReview}/>
          }
        />
        {/* <Route
          path="/favorite_destinations"
          element={<FavoriteDestinations />}
        /> */}
      </Routes>
    </>
  );
}

export default App;
