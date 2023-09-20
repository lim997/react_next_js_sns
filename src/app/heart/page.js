"use client"
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { GetDB } from '../GetDB';
import { PostShape } from '../view/PostShape';
import Modal from '../view/Modal';
import MenuBar from '../MenuBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FiLoader } from 'react-icons/fi';
import '../mainStyle.css';

const Container = styled.div` padding: 20px; margin-left: 100px;`;
const SearchBar = styled.input` display: block; width: 100%; padding: 12px 20px; margin: 0 0 20px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; `;
const Grid = styled.div` display: grid; grid-gap: 4px; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); `;
const GridItem = styled.img` width: 300px; height: 300px; object-fit: cover; &:hover { cursor: pointer; }`;

export default function Heart() {
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([]); // 전체 게시글
  const [search, setSearch] = useState([]); // 검색한 게시글
  const [likes, setLikes] = useState([]); // 해당 아이디가 좋아요 버튼을 누른 게시글
  const [selectedPost, setSelectedPost] = useState(null); // 모달 창을 띄울 게시글
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(<><FiLoader /> Loading</>);

  // 이미지
  useEffect(() => {fetchImages();}, []);

  // 로딩시에 글씨 출력
  useEffect(() => {setLoading("");}, [posts]);

  // 세션 아이디 받아오기
  const [uId, setUId] = useState('');
  useEffect(() => {
    const savedUId = sessionStorage.getItem('uId');
    if (savedUId) {
      setUId(savedUId);
    }
  }, []);

  // 전체 게시글 목록 받아오기
  const fetchImages = async () => {
    const allPosts = await GetDB({ dbName: 'posts', paramName: 'uId', paramValue: '' });
    if (allPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts(allPosts); // 전체 게시물 목록
    }
  };

  // 좋아요한 게시글
  useEffect(() => {
    GetDB({ dbName: 'posts/like', paramName: 'uId', paramValue: uId })
      .then((data) => {
        setLikes(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }, []);

  const likedPosts = posts.filter((post) => {
    // 게시물의 POST_NO가 likes 배열에 포함되어 있고, 검색어가 포함된 게시물인지 확인
    return (
      likes.some((likedPost) => likedPost.POST_NO === post.POST_NO) &&
      (post.U_ID.includes(search) || post.CAPTION.includes(search))
    );
  });

  const handleSearch = (event) => {
    const query = event.target.value; // 검색어 입력란의 값을 가져옴
    setSearch(query); // 검색어를 상태 변수에 업데이트
    setHasMore(false); // 검색 결과를 모두 보여준 후 스크롤 중단
  };

  const toggleModal = (post) => {
    setSelectedPost(post); // 모달을 열 때 선택한 포스트 정보 설정
    setModalOpen(!modalOpen); // 모달 상태 변경
  };

  return (
    <div>
      <Container>
        <SearchBar type="text" placeholder="Search for user or caption" onChange={handleSearch} />
        
        <InfiniteScroll className="loadingMessage" dataLength={likedPosts.length} next={fetchImages} hasMore={hasMore} loader={<div>{loading}</div>}>
          <Grid>
            {likedPosts.map((post) => (
              <GridItem key={post.POST_NO} src={`/files/posts/${post.POST_IMG_SAVE_NAME}`} alt="searchImg"  onClick={() => toggleModal(post)}/>
            ))}
          </Grid>
        </InfiniteScroll>
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
  );
}