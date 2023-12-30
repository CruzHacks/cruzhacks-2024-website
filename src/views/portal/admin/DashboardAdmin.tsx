import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rtdb } from "../../../utils/firebaseapp";
import { push, ref, set, serverTimestamp } from "firebase/database";

const AdminDash = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [notifyBody, setNotifyBody] = useState('');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleChange = (e) => setNotifyBody(e.target.value);

  const handleSubmit = (e) => {
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
    if (window.innerWidth <= 500) {
      return {
        minWidth: '325px',
        minHeight: '365px',
        backgroundColor: '#FFFFFF',
        outline: 'none',
        borderRadius: '6px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    } else {
      return {
        minWidth: '505px',
        minHeight: '333px',
        backgroundColor: '#FFFFFF',
        outline: 'none',
        borderRadius: '6px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
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
        <div
          className="admindash__container--announcement"
          onClick={handleOpen}
        >
          <a>Make Live Announcement</a>
        </div>
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
              <div
                className="announcement-modal__container--submit"
                onClick={handleSubmit}
              >
                <a>Submit</a>
              </div>
              <div className="modal-close" onClick={handleClose}>
                <a>Close</a>
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
