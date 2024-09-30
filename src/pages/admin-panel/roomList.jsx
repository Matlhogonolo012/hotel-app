import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRooms,
  searchRooms,
  updateRoom,
  deleteRoom,
} from "/src/redux-state-management/features/rooms-reducer.jsx";

const RoomList = () => {
  const dispatch = useDispatch();
  const filteredRooms = useSelector((state) => state.rooms.filteredRooms);
  const status = useSelector((state) => state.rooms.status);
  const error = useSelector((state) => state.rooms.error);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);
  const [editForm, setEditForm] = useState({
    roomType: "",
    image: null,
    description: "",
    price: "",
    availability: false,
    maxGuests: 0,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRooms());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(searchRooms(searchQuery));
  }, [searchQuery, dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditClick = (room) => {
    setEditingRoom(room.id);
    setEditForm({
      roomType: room.roomType,
      image: room.image,
      description: room.description,
      price: room.price,
      availability: room.availability,
      maxGuests: room.maxGuests, 
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRoom({ ...editForm, id: editingRoom }));
    setEditingRoom(null);
  };

  const handleDeleteClick = (roomId) => {
    dispatch(deleteRoom(roomId));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div className="room-list">
      {editingRoom && (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <h2>Edit Room</h2>
          <label>
            Room Type:
            <select
              name="roomType"
              value={editForm.roomType}
              onChange={handleEditChange}
              required
            >
              <option value="">Select Room Type</option>
              <option value="Family Suite">Family Suite</option>
              <option value="Connecting Rooms">Connecting Rooms</option>
              <option value="Deluxe Family Room">Deluxe Family Room</option>
            </select>
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={editForm.price}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Max Guests:
            <input
              type="number"
              name="maxGuests"
              value={editForm.maxGuests}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Availability:
            <input
              type="checkbox"
              name="availability"
              checked={editForm.availability}
              onChange={handleEditChange}
            />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditingRoom(null)}>
            Cancel
          </button>
        </form>
      )}
      <input
        type="text"
        placeholder="Search rooms..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
          <div key={room.id} className="room-item">
            <h2>{room.roomType}</h2>
            <p>{room.description}</p>
            <p>R{room.price}</p>
            <p>Status: {room.availability ? "Available" : "Not Available"}</p>
            <p>Max Guests Allowed: {room.maxGuests}</p> 
            <button onClick={() => handleEditClick(room)} className="edit-button">
              Edit
            </button>
            <button onClick={() => handleDeleteClick(room.id)} className="delete-button">
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No rooms available</p>
      )}
    </div>
  );
};

export default RoomList;
