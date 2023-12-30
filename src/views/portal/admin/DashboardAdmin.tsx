import React, { useState } from 'react';
import { rtdb } from "../../../utils/firebaseapp";
import { push, ref, set, serverTimestamp } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardAdmin = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Example data to be added
    const newData = {
      title: title,
      content: content,
      timestamp: serverTimestamp(), // Include the current timestamp
    };

    // Reference to the "announcements" location in the database
    const announcementsRef = ref(rtdb, 'announcements');

    // Push new data to the "announcements" location
    const newReference = push(announcementsRef);
    
    // Set the data at the generated reference
    set(newReference, newData)
      .then(() => {
        console.log("Data added to announcements successfully!");
        // Show success toast notification
        toast.success('Announcement added!', {
          autoClose: 3000, // Close the notification after 3 seconds
        });
        // Clear input fields after successful submission
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error("Error adding data to announcements:", error);
        // Show error toast notification
        toast.error('Failed to add announcement.');
      });
  };

  return (
    <div>
      <h1 className='font-title text-xl'>Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button type="submit">Add Announcement</button>
      </form>

      {/* ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
};

export default DashboardAdmin;
