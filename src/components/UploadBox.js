import React, { useState } from 'react';
import './UploadBox.css';

const FileInfo = ({ uploadedInfo }) => (
  <ul className="preview_info">
    {Object.entries(uploadedInfo).map(([key, value]) => (
      <li key={key}>
        <span className="info_key">{key}</span>
        <span className="info_value">{value}</span>
      </li>
    ))}
  </ul>
);
  
const Logo = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className="icon" x="0px" y="0px" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="#000"
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"
    />
  </svg>
);

const UploadBox = ({ onFileUpload }) => {
  const [isActive, setActive] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState(null);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
    setUploadedInfo({ name, size, type }); // name, size, type 정보를 uploadedInfo에 저장
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      setFileInfo(file);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setActive(false);

    const file = event.target.files[0];
    console.log("file: ", file);
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setFileInfo(file);
      onFileUpload(formData); // 파일 정보를 부모 컴포넌트로 전달
    }
  };
  
  return (
    <label
      className={`preview${isActive ? ' active' : ''} rt`}
      onDragEnter={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragEnd}
      onDrop={handleDrop}
    >
      <input type="file" className="file" onChange={handleUpload} />
      {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />}
      {!uploadedInfo && (
        <>
          <Logo />
          <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
        </>
      )}
    </label>
  );
};

export default UploadBox;