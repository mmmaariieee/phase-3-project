import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DestinationsContainer from "./DestinationsContainer";
import AddDestinationsForm from "./AddDestinationsForm";
import NavBar from "./NavBar";
import AddReviewForm from "./AddReviewForm";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedDest, setSelectedDest] = useState("")

  useEffect(() => {
    fetch("http://localhost:9292/destinations")
      .then((r) => r.json())
      .then((data) => setDestinations(data));
  }, []);

  function handleEditForm(name, value) {
    setSelectedDest({
      ...selectedDest, [name]: value,
    })
  }

  function handleEditDest(updatedDestination) {
    const updatedDestinations = destinations.map((destination) =>
    destination.id === updatedDestination.id ? updatedDestination : destination
    )
    setSelectedDest(updatedDestination)
    setDestinations(updatedDestinations)
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
                deleteDestination={deleteDestination}
                selectedDest={selectedDest}
                setSelectedDest={setSelectedDest}
                editDest={handleEditDest}
                handleEditForm={handleEditForm}
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
      </Routes>
    </>
  );
}

export default App;
