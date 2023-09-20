"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { GetDB } from '../GetDB';
import { changeLike, deletePost } from './PostActions';
import { insertComm } from './CommActions';
import { InputBox } from '../InputBox'
import '../mainStyle.css'
import styled from '@emotion/styled';
import { LuSend } from 'react-icons/lu';
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri';
import { FiHeart, FiMessageCircle, FiLink, FiTrash2 } from 'react-icons/fi';
import { BsFillSuitHeartFill } from 'react-icons/bs';

const Post = styled.div` background-color: white; padding-bottom: 10px; margin-bottom: 20px; border-radius: 5px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);`;
const PostHeader = styled.div`display: flex; align-items: center; justify-content: space-between; padding: 10px 15px; border-bottom: 1px solid #efefef; `;
const PostComment = styled.div`padding: 10px 0px; border-top: 1px solid #efefef; `;
const PostCommentInput = styled.div`display: flex; align-items: center; justify-content: space-between; padding: 10px 15px; `;
const User = styled.div` display: flex; align-items: center; `;
const Avatar = styled.img` width: 32px; height: 32px; border-radius: 50%; margin-right: 10px; `;
const Username = styled.span` font-weight: 600; `;
const PostImage = styled.img` width: 600px; height: 600px;`;
const PostActions = styled.div` display: flex; align-items: center; padding: 10px 15px; border-bottom: 1px solid #efefef; `;
const Comment = styled.div`margin-bottom: 10px`;
const ActionButton = styled.button` background: none; border: none; font-size: 20px; margin-right: 15px; cursor: pointer; `;
const RedHeartIcon = styled(BsFillSuitHeartFill)` color: red; `;
const SendIcon = styled(LuSend)` width: 30px; height: auto; `;

export function PostShape(props) {
  var r = useRouter();
  const [user, setUser] = useState({}); // 게시글 유저 정보
  const [loginUser, setLoginUser] = useState({}); // 로그인한 유저 정보
  const [follow, setFollow] = useState([]); // 팔로잉 테이블
  const [followCheck, setFollowCheck] = useState(false); // 팔로잉 여부 확인
  const [like, setLike] = useState(false); // 좋아요 여부 확인
  const [comments, setComments] = useState([]); // 게시글 댓글 리스트

  // 게시글을 작성한 회원의 정보 받아오기
  useEffect(() => {
    if (props.uId !== '') {
    GetDB({ dbName: 'user', paramName: 'uId', paramValue: props.post.U_ID })
      .then((data) => {
        setUser(data[0]);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
    }
  }, [props.post.U_ID]);

  // 게시글 좋아요 가져오기
  // 좋아요 버튼을 누를 때마다 상태를 다시 받아옴
  const reloadPostLike = () => {
    if (props.uId !== '') {
      GetDB({ dbName: 'posts/like', paramName: 'uId', paramValue: props.uId })
        .then((data) => {
            // 현재 게시물에 대한 좋아요 상태
            setLike(data.some((postData) => props.uId === postData.U_ID && props.post.POST_NO === postData.POST_NO));
          })
          .catch((error) => {
            console.error('데이터를 가져오는 중 오류 발생:', error);
          });
    }
  };

  // 게시글의 댓글 정보 받아오기
  const reloadComm = () => {
    if (props.uId !== '') {
      GetDB({ dbName: 'comment', paramName: 'postNo', paramValue: props.post.POST_NO })
        .then((data) => {
          setComments(data);
        })
        .catch((error) => {
          console.error('데이터를 가져오는 중 오류 발생:', error);
        });
    }
  };

  // 현재 로그인한 회원의 정보 받아오기
  useEffect(() => {
    if (props.uId !== '') {
    GetDB({ dbName: 'user', paramName: 'uId', paramValue: props.uId })
      .then((data) => {
        setLoginUser(data[0]);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
    }
  }, [props.uId]);

  
  // 현재 로그인한 회원의 팔로잉 정보 받아오기
  useEffect(() => {
    if (props.uId) {
      GetDB({ dbName: 'user/follow', paramName: 'uId', paramValue: props.uId })
        .then((data) => {
          setFollow(data);
        })
        .catch((error) => {
          console.error('데이터를 가져오는 중 오류 발생:', error);
        });
    }
  }, [props.uId]);

  // 페이지가 처음 로드될 때 실행
  useEffect(() => { reloadPostLike(); reloadComm(); }, [props.post.U_ID]);

  // 게시글 좋아요 상태 변경
  const onChangeLike = () => { changeLike(props, like, reloadPostLike); };

  // 게시글 삭제 (완전히 삭제하는 것이 아니라 DELYN 값을 업데이트)
  const onDeletePost = () => { deletePost(props, reloadPostLike); };

  // 팔로잉 상태 변경
  const onChangeFollow = () => {
    // follow.followed_u_id와 follow.following_u_id를 비교하여 팔로우 상태 확인
    const isFollowing = follow.some((follower) => 
      follower.followed_u_id === props.uId && follower.following_u_id === follow.following_u_id
    );
  
    if (isFollowing) {
      // 이미 팔로우 중인 경우 언팔로우 처리
    } else {
      // 아직 팔로우하지 않은 경우 팔로우 처리
    }
  };

  console.log(like);
  return (
    <div>
    <Post key={props.post.POST_NO}>
      <PostHeader>
        <User>
          <Avatar src={`/files/user/${user.IMG_SAVE_NAME}`} alt='프로필' />
          <Username>{props.post.U_ID}</Username>
        </User>
        {props.uId != props.post.U_ID && (
          <ActionButton>
            { followCheck ? (
              <RiUserUnfollowFill onClick={onChangeFollow} />
            ) : (
              <RiUserFollowFill onClick={onChangeFollow} />
            )}
          </ActionButton>
        )}
      </PostHeader>
      <PostImage src={`/files/posts/${props.post.POST_IMG_SAVE_NAME}`} alt="Post" />
      <PostActions>
      <ActionButton>
        {like ? (
          <RedHeartIcon onClick={onChangeLike} />
        ) : (
          <FiHeart onClick={onChangeLike} />
        )}
      </ActionButton>
      <ActionButton>
        <FiMessageCircle/>
      </ActionButton>
      <ActionButton>
        <FiLink/>
      </ActionButton>
      {props.uId === props.post.U_ID && (
        <ActionButton>
          <FiTrash2  onClick={onDeletePost}/>
        </ActionButton>
      )}
      </PostActions>
      <div className='captionBox'>
        <Username>{props.post.U_ID} </Username>
        <span>{props.post.CAPTION}</span>
      </div>
      <PostComment className='commBox'>
        {comments.map((comment) => (
          <Comment key={comment.COMM_NO}>
            <Username>{comment.U_ID} </Username>
            {comment.COMMENT}
          </Comment>
        ))}
      </PostComment>
      <PostCommentInput>
      <User>
        <Avatar src={`/files/user/${loginUser.IMG_SAVE_NAME}`} alt='로그인유저프로필'/>
        <Username>{props.uId} </Username>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            insertComm(props.post.POST_NO, e.target.comm.value, props.uId, reloadComm);
            e.target.comm.value = "";
          }}
          style={{ display: "flex", alignItems: "center" }} // 이 부분을 추가합니다
        >
          <InputBox placeholderTxt="댓글을 입력해 주세요." inputType="text" inputName="comm" classNames="wrap commentWrap" maxLength="100" style={{ marginRight: "15px" }} />
          <ActionButton type="submit">
            <SendIcon />
          </ActionButton>
        </form>
      </User>
      </PostCommentInput>
    </Post>
    </div>
  );
}