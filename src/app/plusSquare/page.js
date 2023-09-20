"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { RadioCheck } from '../RadioCheck'
import '../mainStyle.css'

import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Container = styled.div` padding: 50px; margin: 100px auto;`;
const Form = styled.form``;
const Input = styled.input` display: block; width: 100%; padding: 12px 20px; margin: 0 0 20px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; `;
const Label = styled.label` display: block; margin-bottom: 5px; `;

export default function PlusSquare() {
  var r = useRouter();
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [uId, setUId] = useState('');
    useEffect(() => {
      const savedUId = sessionStorage.getItem('uId');
      if (savedUId) {
        setUId(savedUId);
      }
    }, []);

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const fileName = selectedFile.name; // 선택한 파일의 이름 가져오기
      document.getElementById('fileName').value = fileName; // 파일 이름을 입력 필드에 설정
    
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setFile(selectedFile);
        setPreviewImage(reader.result); // 이미지 미리보기 설정
      });
      reader.readAsDataURL(selectedFile);
    }
  };

  const onImageLoaded = (image) => {
    setCroppedImage(image);
  };

  const onCropComplete = (crop) => {
    if (croppedImage && crop.width && crop.height) {
      // Implement image cropping logic here
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 게시글 테이블 업로드
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uId: uId, caption: e.target.caption.value
                          , location: e.target.location.value , open: e.target.open.value}) // JSON 데이터를 전송
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then(async (data) => {
        const postNo = data.postNo; // 삽입된 postNo을 가져와 파일 업로드 fk로 사용
        console.log('서버 응답:', data);
    
        // 파일 테이블 업로드
        const formData = new FormData(); // FormData 객체 생성
        if (file !== null) {
          formData.append('file', file);
          formData.append('postNo', postNo); // fk 키
        }
        try {
          const response = await fetch('/api/posts/img', {
            method: 'POST',
            body: formData
          });
    
          if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다.');
          }
    
          const data = await response.json();
          console.log('서버 응답:', data);
        } catch (error) {
          console.error('POST 요청 중 오류 발생:', error);
        }
      })
      .catch((error) => {
        console.error('POST 요청 중 오류 발생:', error);
      });

      alert("게시글 등록이 완료되었습니다.");
      r.push('/main');
  };

  return (
    <div>
      <Container className='uploadBox'>
      <div className="centerTitle">게시글 업로드</div>
        <Form onSubmit={handleSubmit}>
          <Label>Upload a photo:</Label>
          <div className="filebox">
            <input className="upload-name" id="fileName" placeholder="첨부파일" readOnly></input>
            <label htmlFor="file-input">이미지선택</label> 
            <Input type="file" id="file-input" accept=".gif, .jpg, .png" onChange={onFileChange} />
            <div className="previewImg">
              {previewImage && ( // 추가: 미리보기 이미지가 있을 때만 렌더링
                <img src={previewImage} alt="Preview" style={{ width: '100%' }} /> 
              )}
            </div>
          </div>
          {file && (
            <ReactCrop
              src={URL.createObjectURL(file)} // 파일 URL 사용
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
            />
          )}
          <Label htmlFor="caption">Caption:</Label>
          <Input type="text" id="caption" name="caption" placeholder="Write a caption" />
          <Label htmlFor="location">Location:</Label>
          <Input type="text" id="location" name="location" placeholder="Add a location" />
          <div className="openBox">
            <RadioCheck idValue="openY" inputValue="Y" inputName="open" labelValue="전체 공개" defaultValue={true} />
            <RadioCheck idValue="openF" inputValue="F" inputName="open" labelValue="친구 공개" />
            <RadioCheck idValue="openN" inputValue="N" inputName="open" labelValue="비공개" />
          </div>
          <button type="submit" className="longBtn uploadBtn whiteBtn">업로드</button>
        </Form>
      </Container>
      <MenuBar />
    </div>
  );
}