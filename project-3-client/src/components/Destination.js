import React, { useState } from 'react'
import ReviewList from './ReviewList'
import AddReview from './AddReview'
import EditDestination from './EditDestination';

function Destination({destination, handleDelete}) {
  const {id, city_name, country_name, continent, img_url, reviews} = destination;
  const [destReviews, setDestReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  console.log(destReviews);

  return (
    <>
      <div className='card'>
        <div className='container'>
          <h1>{city_name}</h1>
          <img className='image' src={img_url} alt={city_name}/>
          <h2>{country_name}</h2>
          <h2>{continent?.continent_name}</h2>
          <button className='edit' onClick={() => setShowForm(!showForm)}
          >Edit</button>
          <button
          className='delete'
          onClick={() => handleDelete(id)}
          >Delete</button>
        </div>
      </div>
      {showForm ? <EditDestination/> : null }
      <ReviewList reviews={reviews} destinationId={id} setDestReviews={setDestReviews}/>
      <AddReview/>
    </>
  )
}

export default Destination