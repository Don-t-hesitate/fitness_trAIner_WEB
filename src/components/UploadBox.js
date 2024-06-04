import React, { useEffect, useState } from "react";
import "./UploadBox.css";

const FileInfo = ({ uploadedInfo, multiple }) => {
  const [object, setObject] = useState([]);

  // multiple true|false 서로의 setObject 형태가 다름 --> **추후 통일 필요**
  useEffect(() => {
    if (multiple && Array.isArray(uploadedInfo)) {
      setObject(
        uploadedInfo.map(({ name, size, type }, index) => (
          <li key={`${name}-${index}`}>
            <span className="info_key">Name:</span>
            <span className="info_value">{name}</span>
            <span className="info_key">Size:</span>
            <span className="info_value">{size}</span>
            <span className="info_key">Type:</span>
            <span className="info_value">{type}</span>
            <div>
              ---------------------------------------------------------------------------
            </div>
          </li>
        ))
      );
    } else if (!multiple && typeof uploadedInfo === "object") {
      setObject(
        Object.entries(uploadedInfo).map(([key, value]) => (
          <li key={key}>
            <span className="info_key">{key}</span>
            <span className="info_value">{value}</span>
          </li>
        ))
      );
    }
  }, [uploadedInfo, multiple]);

  return (
    <ul
      className="preview_info"
      style={{ maxHeight: "100%", overflowY: "auto", marginBottom: 0 }}
    >
      {object}
    </ul>
  );
};

const Logo = () => (
  <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24">
    <path fill="transparent" d="M0,0h24v24H0V0z" />
    <path
      fill="#000"
      d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"
    />
  </svg>
);

const UploadBox = ({ onFileUpload, multiple = false, extension = null }) => {
  const [isActive, setActive] = useState(false);
  const [uploadedInfo, setUploadedInfo] = useState(null);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + "mb";

    // name, size, type 정보를 uploadedInfo에 저장
    if (multiple) {
      setUploadedInfo((prev) => [...(prev || []), { name, size, type }]);
    } else {
      setUploadedInfo({ name, size, type });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);
    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const formData = new FormData();

      // uploadedInfo 초기화
      setUploadedInfo(null);
      if (multiple) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
          setFileInfo(files[i]);
        }
      } else {
        formData.append("file", files[0]);
        setFileInfo(files[0]);
      }

      if (!extension) {
        onFileUpload(formData); // 파일 정보를 부모 컴포넌트로 전달
      } else {
        let extensionType = files[0].name.split(".").pop();
        if (extensionType === "jpg" || extensionType === "jpeg") {
          extensionType = "jpg";
        }
        if (extensionType === extension) {
          onFileUpload(formData, extension); // 파일 정보를 부모 컴포넌트로 전달
        } else {
          alert(`확장자가 ${extension}인 파일을 업로드해주세요.`);
          setUploadedInfo(null);
        }
      }
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setActive(false);
    const files = event.target.files;

    if (files.length > 0) {
      const formData = new FormData();

      // uploadedInfo 초기화
      setUploadedInfo(null);
      if (multiple) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
          setFileInfo(files[i]);
        }
      } else {
        formData.append("file", files[0]);
        setFileInfo(files[0]);
      }

      if (!extension) {
        onFileUpload(formData); // 파일 정보를 부모 컴포넌트로 전달
      } else {
        let extensionType = files[0].name.split(".").pop();
        if (extensionType === "jpg" || extensionType === "jpeg") {
          extensionType = "jpg";
        }
        if (extensionType === extension) {
          onFileUpload(formData, extension); // 파일 정보를 부모 컴포넌트로 전달
        } else {
          alert(`확장자가 ${extension}인 파일을 업로드해주세요.`);
          setUploadedInfo(null);
        }
      }
    }
  };

  return (
    <label
      className={`preview${isActive ? " active" : ""} rt`}
      onDragEnter={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragEnd}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="file"
        onChange={handleUpload}
        multiple={multiple}
      />
      {uploadedInfo && (
        <FileInfo uploadedInfo={uploadedInfo} multiple={multiple} />
      )}
      {!uploadedInfo && (
        <>
          <Logo />
          {multiple ? (
            <p className="preview_msg">
              클릭 혹은 파일을 이곳에 드롭하세요. 파일을 다중으로 추가할 수
              있습니다.
            </p>
          ) : (
            <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
          )}
        </>
      )}
    </label>
  );
};

export default UploadBox;
