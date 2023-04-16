"use client"

import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({isSignin}: {isSignin: boolean}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  }



  return (
    <div>
      <button
          className={`${isSignin ? "bg-blue-400 text-white border p-1 px-4 rounded mr-3": "border p-1 px-4 rounded mr-3"}`} onClick={handleOpen}
      >
        {renderContent("Sign in", "Sign Up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2 h-[500px]">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-sm">{renderContent("Sign in", "Create Account")}</p>
            </div>
            <div className="m-auto">
              <h2 id="modal-modal-title" className="text-center text-2xl font-light">
                {renderContent("Sign in to OpenTable", "Create an OpenTable account")}
              </h2>
              <AuthModalInputs />
              <button className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'>
                {renderContent("Sign in", "Create Account")}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
