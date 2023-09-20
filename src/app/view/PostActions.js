export const changeLike = (props, like, reloadPostLike) => {
    if (like) {
      // 이미 좋아요를 누른 상태이므로 좋아요 취소 (딜리트)
      fetch('/api/posts/like', {
        method: 'DELETE',
        body: JSON.stringify({ uId: props.uId, postNo: props.post.POST_NO }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다.');
          }
          return response.json();
        })
        .then((data) => {
          console.log('서버 응답:', data);
          reloadPostLike(); // 좋아요 취소 후, postLike를 다시 불러오기
        })
        .catch((error) => {
          console.error('DELETE 요청 중 오류 발생:', error);
        });
      alert('좋아요 취소');
    } else {
      // 아직 좋아요를 누르지 않은 상태이므로 좋아요 요청
      fetch('/api/posts/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uId: props.uId, postNo: props.post.POST_NO }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다.');
          }
          return response.json();
        })
        .then((data) => {
          console.log('서버 응답:', data);
          reloadPostLike(); // 좋아요 후, postLike를 다시 불러오기
        })
        .catch((error) => {
          console.error('POST 요청 중 오류 발생:', error);
        });
      alert('좋아요♥');
    }
  };
  
export const deletePost = (props, reloadPostLike) => {
  if (!confirm('해당 게시글을 삭제하시겠습니까?')) {
    return;
  }
 
  fetch(`/api/posts`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postNo: props.post.POST_NO }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then((data) => {
      console.log('서버 응답:', data);
      alert('게시글 삭제가 완료되었습니다.');
 
      // /main 페이지를 리로드
      if (window.location.pathname === '/main') {
        window.location.reload();
      } else {
        // 다른 페이지에서 삭제한 경우 /main 페이지로 이동
        r.push('/main');
      }
    })
    .catch((error) => {
      console.error('PUT 요청 중 오류 발생:', error);
    });
};