import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { DataArraySharp } from '@mui/icons-material';

function LoadingModal( {data} ){
  const [loading, setLoading] = useState(true);
  
  const openModal = () => {
    document.documentElement.style.setProperty('--Sidebar-blur', 'blur(2px)');
    document.documentElement.style.setProperty('--Header-blur', 'blur(2px)');
    document.documentElement.style.setProperty('--Header-color', '#cccdce');
    document.documentElement.style.setProperty('--joy-palette-background', '#cccdce');
    document.documentElement.style.setProperty('--Logout-color', '#084F96');
    document.documentElement.style.setProperty('--Logout-text-color', '#ffffff');
    setLoading(true);
  };

  const closeModal = () => {
    document.documentElement.style.removeProperty('--Sidebar-blur');
    document.documentElement.style.removeProperty('--Header-blur');
    document.documentElement.style.removeProperty('--Header-color', '#fbfcfe');
    document.documentElement.style.removeProperty('--joy-palette-background', '#fbfcfe');
    document.documentElement.style.removeProperty('--Logout-color', 'primary');
    document.documentElement.style.removeProperty('--Logout-text-color', '#ffffff');
    setLoading(false);
  };

  useEffect(() => {
    openModal();
    closeModal();
  }, []);

  useEffect(() => {
    if(data) {
      closeModal();
    }
  }, [data]);

  return (
    <div>
      <Modal
        keepMounted
        disableAutoFocus
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        onClose={(e) => {e.stopPropagation(); e.preventDefault();}}
        open={loading}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <Button variant='neutral' loading loadingPosition='start' sx={{cursor: 'default'}}>
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="black"
              fontWeight="lg"
            >
              &nbsp;&nbsp;&nbsp;데이터 로딩 중...
            </Typography>
          </Button>
            {/* <Typography 
              id="modal-desc" 
              textColor="text.tertiary"
              sx={{ fontWeight: 'bolder', color: 'text.tertiary'}}  
            >
              데이터 로딩 중입니다. 잠시만 기다려주세요...
            </Typography> */}
        </Sheet>
      </Modal>
    </div>
  );
};

export default LoadingModal;