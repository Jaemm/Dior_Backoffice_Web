import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../data/AppContext';

const FileUpload = ({ productData, setProductData, setLoading }) => {
  const [show, setShow] = useState(false);
  const { token } = useAppContext();
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setShow(!show);
  };

  const handleSubmission = () => {
    setLoading(true);
    axios
      .get(
        'https://v2-app.chowis.com/api/pmx/product_recommendations/presign_upload',
        {
          headers: {
            'X-CHOWIS-CONSULTANT-TOKEN': token,
          },
          params: {
            filename: selectedFile?.name,
          },
        }
      )
      .then((res) => {
        // console.log("filename", res.data);
        const presigned_url = res.data.presigned_url;
        const public_url = res.data.public_url;

        s3Testing(presigned_url, public_url);
      })
      .catch((err) => {
        console.log('Presign Upload Error => ', err);
        setLoading(false);
      });
  };

  const s3Testing = (presigned_url, public_url) => {
    axios
      .put(presigned_url, selectedFile, {})
      .then((res) => {
        setLoading(false);
        console.log('S3 Testing Success!', res.status);
        setShow(!show);
        //if status 200 set public_url to image_url
        setProductData({ ...productData, image_url: public_url });
      })
      .catch((err) => {
        console.log('S3 Testing Error =>', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSubmission();
  }, [selectedFile]);

  return (
    <Container className="upload-button-box">
      <div style={{ position: 'absolute' }}>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={changeHandler}
          style={{
            width: '275px',
            height: '372px',
            borderRadius: 5,
            opacity: 0,
            cursor: 'pointer',
          }}
        />
      </div>

      {selectedFile && (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="avatar"
          className="image"
        />
      )}
    </Container>
  );
};

export default FileUpload;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  .image {
    width: 100%;
    height: 376px;
    object-fit: cover;
  }
`;
