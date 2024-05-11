import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const LoadingModal = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      {loading && <Modal show={true} centered><Modal.Body>Loading...</Modal.Body></Modal>}
    </div>
  );
};

export default LoadingModal;