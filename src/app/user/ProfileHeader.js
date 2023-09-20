"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { GetDB } from '../GetDB';
import Modal from '../view/Modal';
import styled from '@emotion/styled';
import Link from 'next/link'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '../mainStyle.css'

const ProfileHeaderContainer  = styled.div` display: flex; align-items: center; margin-bottom: 20px; `;
const Avatar = styled.img` width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-right: 20px; `;
const UserInfo = styled.div``;
const Username = styled.h2` margin: 0; `;
const Bio = styled.p` margin: 0; `;
const Stats = styled.ul` display: flex; list-style: none; padding: 0; margin: 0; `;
const StatItem = styled.li` margin-right: 20px; &:last-child { margin-right: 0; } `;
const StatValue = styled.strong` display: block; `;
const StatLabel = styled.span``;
const EditProfileButton = styled.button` background-color: #AAAAAA; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 10px 0; cursor: pointer; border-radius: 4px; `;
const Container = styled.div` padding: 50px; margin: 20px auto;`;
const Form = styled.form``;
const Input = styled.input` display: block; width: 100%; padding: 12px 20px; margin: 0 0 20px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; `;
const Label = styled.label` display: block; margin-bottom: 5px; `;

export function ProfileHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUId, setSelectedUId] = useState(null);
  var r = useRouter();
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // 페이지 새로 고침
  const reloadPage = (url) => {
      window.location.href = url;
  };

  // 세션 아이디 받아오기
  const [uId, setUId] = useState('');
  useEffect(() => {
    const savedUId = sessionStorage.getItem('uId');
    if (savedUId) {
      setUId(savedUId);
    }
  }, []);
  console.log(uId);

  // 유저 정보 받아오기
  const [user, setUser] = useState({});
  useEffect(() => {
    if (uId !== '') {
    GetDB({ dbName: 'user', paramName: 'uId', paramValue: uId })
      .then((data) => {
        console.log(data);
        setUser(data[0]);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
    }
  }, [uId]);

  const toggleModal = (user) => {
    setSelectedUId(user); // 모달을 열 때 선택한 유저의 정보 설정
    setModalOpen(!modalOpen); // 모달 상태 변경
  };
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
    fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uId: uId, introduce: e.target.introduce.value}) // JSON 데이터를 전송
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then(async (data) => {
        console.log('서버 응답:', data);
    
        // 파일 테이블 업로드
        const formData = new FormData(); // FormData 객체 생성
        if (file !== null) {
          formData.append('file', file);
          formData.append('uId', uId); // fk 키
        }
        try {
          const response = await fetch('/api/user/img', {
            method: 'PUT',
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

      alert("정보 수정이 완료되었습니다.");
      window.location.reload();
  };
  return (
    <ProfileHeaderContainer>
      <Avatar src={`/files/user/${user.IMG_SAVE_NAME}`} />
        <UserInfo>
          <Username>{user.U_NAME}</Username>
          <Bio>{user.INTRODUCE}</Bio>
          <Stats>
            <StatItem>
              <Link href='/user' className='blackBtn'>
                <StatValue>{user.POSTS !== null ? user.POSTS : 0}</StatValue>
                <StatLabel>Posts</StatLabel>
              </Link>
            </StatItem>
            <StatItem>
              <Link href='/user/follow?check=follower' className='blackBtn' onClick={() => reloadPage('/user/follow?check=follower')}>
                <StatValue>{user.FOLLOWER !== null ? user.FOLLOWER : 0}</StatValue>
                <StatLabel>Follower</StatLabel>
              </Link>
            </StatItem>
            <StatItem>
              <Link href='/user/follow?check=following' className='blackBtn' onClick={() => reloadPage('/user/follow?check=following')}>
                <StatValue>{user.FOLLOWING !== null ? user.FOLLOWING : 0}</StatValue>
                <StatLabel>Following</StatLabel>
              </Link>
            </StatItem>
          </Stats>
          <EditProfileButton onClick={() => toggleModal(user)}>Edit Profile</EditProfileButton>
        </UserInfo>
      <div>
        {modalOpen && selectedUId && (
          <Modal onClose={() => setModalOpen(false)}>
            <Container className='updateBox'>
              <div className="centerTitle">정보 수정</div>
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
                <Label htmlFor="introduce">Introduce:</Label>
                <Input type="text" id="introduce" name="introduce" defaultValue={user.INTRODUCE} placeholder="나를 소개하는 문구를 작성해 보세요!" />

                <button type="submit" className="longBtn uploadBtn whiteBtn">Update</button>
              </Form>
            </Container>
          </Modal>
        )}
      </div>
    </ProfileHeaderContainer>
  );
}