"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../../MenuBar';
import { GetDB } from '../../GetDB';
import { ProfileHeader } from '../ProfileHeader';
import '../../mainStyle.css'

const Container = styled.div` padding: 20px; margin-left: 100px; `;
const ActivityTabs = styled.div` display: flex; justify-content: space-around; border-bottom: 1px solid #ccc; margin-bottom: 20px; `;
const Tab = styled.button` padding: 10px; font-size: 18px; background-color: transparent; border: none; outline: none; cursor: pointer; color: ${(props) => (props.active ? '#000' : '#ccc')}; font-weight: ${(props) => (props.active ? 'bold' : 'normal')}; &:hover { color: #000; } `;
const ActivityList = styled.ul` list-style: none; padding: 0; `;
const ActivityItem = styled.li` display: flex; align-items: center; margin-bottom: 20px; `;
const Avatar = styled.img` width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-right: 10px; `;
const ActivityContent = styled.div``;

export default function Follow() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('followers');

  // 세션에 담긴 아이디와 팔로잉 목록 받아오기
  const [uId, setUId] = useState('');
  const [follow, setFollow] = useState([]);
  const [users, setUsers] = useState([]); // 회원 프로필 사진을 받아오기 위함

  useEffect(() => {
    const savedUId = sessionStorage.getItem('uId');
    if (savedUId) {
      setUId(savedUId);
    }
  }, []);

  useEffect(() => {
    if (uId) {
      GetDB({ dbName: 'user/follow', paramName: 'uId', paramValue: uId })
        .then((data) => {
          setFollow(data);
        })
        .catch((error) => {
          console.error('데이터를 가져오는 중 오류 발생:', error);
        });
    }
  }, [uId]);

  useEffect(() => {
    if (uId) {
      GetDB({ dbName: 'user', paramName: 'uId', paramValue: '' })
        .then((data) => {
          console.log(data);
          setUsers(data);
        })
        .catch((error) => {
          console.error('데이터를 가져오는 중 오류 발생:', error);
        });
    }
  }, [uId]);

  // URL에서 'check' 파라미터 값을 가져와 팔로워/팔로잉 탭 업데이트
  useEffect(() => {
    const check = searchParams.get('check'); // 팔로워/팔로잉 선택한 목록에 대한 파라미터 값을 받아옴
    if (check) {
      setActiveTab(check);
    }
  }, [searchParams]);

  // 원하는 탭을 선택하면 해당 탭으로 값 변경
  const tabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Container>
        <ProfileHeader />
        <ActivityTabs>
          <Tab active={activeTab === 'follower'} onClick={() => tabClick('follower')}>
            Follower
          </Tab>
          <Tab active={activeTab === 'following'} onClick={() => tabClick('following')}>
            Following
          </Tab>
        </ActivityTabs>
        {activeTab === 'follower' && (
          <ActivityList>
            {follow.length > 0 &&
              follow
                .filter((follower) => follower.FOLLOWING_U_ID === uId)
                .map((follower, index) => {
                  // follower.FOLLOWER_U_ID와 users.U_ID를 비교하여 일치하는 사용자 찾기
                  const matchingUser = users.find((user) => user.U_ID === follower.FOLLOWER_U_ID);
        
                  return (
                    <ActivityItem key={index}>
                      <Avatar src={`/files/user/${matchingUser.IMG_SAVE_NAME}`} />
                      <ActivityContent>
                        <strong>{follower.FOLLOWER_U_ID}</strong>
                      </ActivityContent>
                    </ActivityItem>
                  );
              })}
          </ActivityList>
        )}

        {activeTab === 'following' && (
          <ActivityList>
            {follow.length > 0 &&
              follow
                .filter((following) => following.FOLLOWER_U_ID === uId)
                .map((following, index) => {
                  const matchingUser = users.find((user) => user.U_ID === following.FOLLOWING_U_ID);
        
                  return (
                    <ActivityItem key={index}>
                      <Avatar src={`/files/user/${matchingUser.IMG_SAVE_NAME}`} />
                      <ActivityContent>
                        <strong>{following.FOLLOWING_U_ID}</strong>
                      </ActivityContent>
                    </ActivityItem>
                  );
              })}
        </ActivityList>
        )}
      </Container>
      <MenuBar />
    </div>
  )
}