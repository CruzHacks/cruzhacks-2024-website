import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rtdb } from "../../../utils/firebaseapp";
import { push, ref, set, serverTimestamp } from "firebase/database";

const AdminDash = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [notifyBody, setNotifyBody] = useState('');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotifyBody(e.target.value);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (notifyBody === '') {
      toast.warning('An announcement must have a body... 😑');
      return;
    }

    const newData = {
      title: '',
      body: notifyBody,
      date: serverTimestamp(),
    };

    const announcementsRef = ref(rtdb, 'announcements');
    const newReference = push(announcementsRef);

    set(newReference, newData)
      .then(() => {
        console.log('Data added to announcements successfully!');
        toast.success('Successfully Delivered Announcement 😎');
        setNotifyBody('');
      })
      .catch((error) => {
        console.error('Error adding data to announcements:', error);
        toast.error('Unable to deliver message, please try again. 🤬');
      });
  };

  const checkSize = () => {
    const commonStyles = {
      minWidth: '505px',
      minHeight: '333px',
      backgroundColor: '#FFFFFF',
      outline: 'none',
      borderRadius: '6px',
      // Explicitly define the type for position
      position: 'absolute' as const, // or use a more specific type
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

    if (window.innerWidth <= 500) {
      // Adjust styles for smaller screens if needed
      return {
        ...commonStyles,
        minWidth: '325px',
        minHeight: '365px',
      };
    } else {
      return commonStyles;
    }
  };


  return (
    <div className="admindash__container">
      <div className="admindash__container--top">
        <div className="admindash__container--title">
          <div className="admindash__container--text1">
            Welcome back, User
          </div>
          <div className="admindash__container--text2">
            What would you like to do today?
          </div>
        </div>
        <button className="admindash__container--announcement" onClick={handleOpen}>
          Make Live Announcement
        </button>

        {modalOpen && (
          <div className="modal" style={checkSize()}>
            <div className="announcement-modal__container">
              <div className="announcement-modal__container--title">
                What do you want to say?
              </div>
              <textarea
                className="announcement-modal__container--input"
                value={notifyBody}
                onChange={(e) => handleChange(e)}
              />
              <div>
                <div>
                  <button
                    className="announcement-modal__container--submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <button className="modal-close" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDash;
