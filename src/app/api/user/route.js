import { NextResponse } from 'next/server'
import db from '../../db';

export async function GET(req) { 

  // console.log("req.query ==> ", req.query);
  const { searchParams } = new URL(req.url);
  const uId = searchParams.get('uId');
  console.log("req.query ==> ", uId);
  console.log(req.url);

  try {
    // 클라이언트로부터 전송된 JSON 데이터를 파싱합니다.
    const results = await new Promise((resolve, reject) => {
      var sql = 'SELECT * FROM user_tbl U INNER JOIN user_img_tbl I ON I.U_ID = U.U_ID';
      // 로그인 했을 때
      if(uId != ''){
        sql += ` LEFT JOIN (
                    SELECT COUNT(*) AS POSTS, U_ID
                    FROM posts_tbl
                    WHERE U_ID = '${uId}' AND DELYN = 'N'
                    GROUP BY U_ID
                  ) P ON P.U_ID = U.U_ID
                  LEFT JOIN (
                    SELECT COUNT(FOLLOWER_U_ID) AS FOLLOWING, FOLLOWER_U_ID
                    FROM user_follow_tbl
                    WHERE FOLLOWER_U_ID = '${uId}'
                  ) F1 ON F1.FOLLOWER_U_ID = U.U_ID
                  LEFT JOIN (
                    SELECT COUNT(FOLLOWING_U_ID) AS FOLLOWER, FOLLOWING_U_ID
                    FROM user_follow_tbl
                    WHERE FOLLOWING_U_ID = '${uId}'
                  ) F2 ON F2.FOLLOWING_U_ID = U.U_ID
                  WHERE U.U_ID = '${uId}'`;
      }
      db.query(sql, (err, results) => {
        if (err) {
          console.error('데이터를 가져오는 중 오류 발생:', err);
          reject(err);
        } else {
          console.log('data ==> ', results);
          resolve(results);
        }
      });
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.error('데이터를 가져올 수 없습니다.', 500);
  }
}

export async function POST(req) {
  try {
    // 클라이언트로부터 전송된 JSON 데이터를 파싱합니다.
    const requestData = await req.json();

    // 데이터베이스에 데이터를 삽입 또는 업데이트하는 작업을 수행합니다.
    // 예시: 데이터베이스에 "test" 테이블에 데이터 추가
    const insertResult = await new Promise((resolve, reject) => {
      db.query("INSERT INTO user_tbl VALUES (?, ?, ?, ?, ?, ?, ?, ?, '', 'U', now(), 0, 'N', 'N')"
            , [requestData.uId, requestData.uPwd, requestData.uName, requestData.phone
            , requestData.email, requestData.birth, requestData.pEventYN, requestData.mEventYN], (err, result) => {
        if (err) {
          console.error('데이터 삽입 중 오류 발생:', err);
          reject(err);
        } else {
          console.log('데이터가 성공적으로 삽입되었습니다.');
          resolve(result);
        }
      });
    });

    const imgInsertResult = await new Promise((resolve, reject) => {
      db.query("INSERT INTO user_img_tbl(U_ID, IMG_NAME, IMG_SAVE_NAME, IMG_PATH, IMG_DATE) VALUES (?, 'basic.jpg', 'basic.jpg', 'C:\\apache-tomcat-9.0.76\\webapps\\ROOT\\next_sns_ui\\public\\files\\user\\basic.jpg', DATE_FORMAT(NOW(), '%Y-%m-%d'))"
            , [requestData.uId], (err, result) => {
        if (err) {
          console.error('데이터 삽입 중 오류 발생:', err);
          reject(err);
        } else {
          console.log('데이터가 성공적으로 삽입되었습니다.');
          resolve(result);
        }
      });
    });

    return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' });
  } catch (error) {
    console.error('POST 요청 처리 중 오류 발생:', error);
    return NextResponse.error('데이터를 처리할 수 없습니다.', 500);
  }
}
export async function PUT(req) {
  try {
    const updatedData = await req.json(); // 클라이언트가 전달한 업데이트할 데이터

    // 데이터 업데이트 작업
    const updateResult = await new Promise((resolve, reject) => {
      db.query('UPDATE user_tbl SET INTRODUCE = ? WHERE U_Id = ?', [updatedData.introduce, updatedData.uId], (err, result) => {
        if (err) {
          console.error('데이터 업데이트 중 오류 발생:', err);
          reject(err);
        } else {
          console.log('데이터가 성공적으로 업데이트되었습니다.');
          resolve(result);
        }
      });
    });

    return NextResponse.json({ message: '데이터가 성공적으로 업데이트되었습니다.' });
  } catch (error) {
    console.error('PUT 요청 처리 중 오류 발생:', error);
    return NextResponse.error('데이터를 업데이트할 수 없습니다.', 500);
  }
}