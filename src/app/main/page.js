"use client"
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import { GetDB } from '../GetDB';
import { PostShape } from '../view/PostShape';

const Feed = styled.div` max-width: 600px; padding: 20px 0; margin-left: 60px; margin: 0 auto; `;

export default function Main(){
  const [uId, setUId] = useState('');
  useEffect(() => {
    const savedUId = sessionStorage.getItem('uId');
    if (savedUId) {
      setUId(savedUId);
    }
  }, [uId]);

  // 게시글 가져오기
  const [posts, setPost] = useState([]);
  useEffect(() => {
    GetDB({ dbName: 'posts', paramName: 'uId', paramValue: '' })
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }, []);

  return (
    <div>
      <Feed>
        {posts.map((post) => {
          return (
            <PostShape key={post.POST_NO} post={post} uId={uId}/>
          );
        })}
      </Feed>
      <MenuBar />
    </div>
  )
}