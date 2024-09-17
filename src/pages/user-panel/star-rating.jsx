import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRating } from '../../redux-state-management/features/ratings-reducer';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    dispatch(addRating({ rating, comment, date: new Date().toISOString() }));
    setRating(0);
    setComment('');
  };

  return (
    <div>
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= rating ? "on" : "off"}
              onClick={() => handleRating(index)}
            >
              <span className="star">★</span>
            </button>
          );
        })}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StarRating;
