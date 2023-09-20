export const insertComm = (postNo, comment, uId, reloadComm) => {
    // 댓글 추가
    fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postNo: postNo, comment: comment, uId: uId }),
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다.');
          }
          return response.json();
        })
        .then((data) => {
          console.log('서버 응답:', data);
          reloadComm(); // 좋아요 후, 다시 불러오기
        })
        .catch((error) => {
          console.error('POST 요청 중 오류 발생:', error);
        });
    alert('댓글이 등록되었습니다.');
}