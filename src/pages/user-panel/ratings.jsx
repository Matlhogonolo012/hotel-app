import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRatings } from '/src/redux-state-management/features/ratings-reducer.jsx';
import StarRating from './star-rating';
import '/src/pages/user-panel/rating.css';

function UserRating() {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.ratings.ratings);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Hotel Room Ratings</h1>
      <StarRating />
      <h2>Previous Ratings</h2>
      <ul>
        {ratings.map((rating) => (
          <li key={rating.id}>
            <p>Rating: {rating.rating} stars</p>
            <p>Comment: {rating.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserRating;
