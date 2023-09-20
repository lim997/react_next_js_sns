"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import { GetDB } from '../GetDB';
import { ProfileHeader } from './ProfileHeader';
import { PostShape } from '../view/PostShape';
import Modal from '../view/Modal';
import '../mainStyle.css'

const Container = styled.div` padding: 20px; margin-left: 100px; `;
const PostTabs = styled.div` display: flex; justify-content: space-around; border-bottom: 1px solid #ccc; margin-bottom: 20px; `;
const Tab = styled.button` padding: 10px; font-size: 18px; background-color: transparent; border: none; outline: none; cursor: pointer; color: ${(props) => (props.active ? '#000' : '#ccc')}; font-weight: ${(props) => (props.active ? 'bold' : 'normal')}; &:hover { color: #000; }; `;
const Posts = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px; `;
const Post = styled.img` width: 320px; height: 320px; object-fit: cover; transition: background-color 0.3s; &:hover { cursor: pointer; }`;

export default function User(){
    const [activeTab, setActiveTab] = useState('posts');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    // 세션 아이디 받아오기
    const [uId, setUId] = useState('');
    useEffect(() => {
      const savedUId = sessionStorage.getItem('uId');
      if (savedUId) {
        setUId(savedUId);
      }
    }, []);

    // 게시글 받아오기
    const [posts, setPost] = useState([]);
    useEffect(() => {
      if (uId !== '') {
        GetDB({ dbName: 'posts', paramName: 'uId', paramValue: uId })
          .then((data) => {
            console.log(data);
            setPost(data);
          })
          .catch((error) => {
            console.error('데이터를 가져오는 중 오류 발생:', error);
          });
      }
    }, [uId]);

    const toggleModal = (post) => {
      setSelectedPost(post); // 모달을 열 때 선택한 포스트 정보 설정
      setModalOpen(!modalOpen); // 모달 상태 변경
    };

    const tabs = [
      { id: 'posts', label: 'Posts' },
      { id: 'friends', label: 'Friends' },
      { id: 'locks', label: 'Locks' },
    ];
    const tabItems = [
      { id: 'posts', label: '공개이미지' },
      { id: 'friends', label: '친구공개이미지' },
      { id: 'locks', label: '비공개이미지' },
    ];

    return (
      <div>
        <Container>
        <ProfileHeader />
          <PostTabs>
            {tabs.map((tab) => (
              <Tab key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </Tab>
            ))}
          </PostTabs>
          {tabItems.map((tabItem) => (
            activeTab === tabItem.id && (
              <Posts key={tabItem.id}>
                {posts.map((post) => {
                  if ((tabItem.id === 'posts') || (tabItem.id === 'friends' && post.OPEN === 'F') || (tabItem.id === 'locks' && post.OPEN === 'N')) {
                    return (
                      <Post key={post.POST_NO} src={`/files/posts/${post.POST_IMG_SAVE_NAME}`} alt={tabItem.label} onClick={() => toggleModal(post)} />
                    );
                  }
                  return null;
                })}
              </Posts>
            )
          ))}
      </Container>
    <MenuBar />
    <div>
      {modalOpen && selectedPost && (
        <Modal onClose={() => setModalOpen(false)}>
          <PostShape key={selectedPost.POST_NO} post={selectedPost} uId={uId} />
        </Modal>
      )}
    </div>
  </div>
    )
  }