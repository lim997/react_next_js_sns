import { NextResponse } from 'next/server'
import db from '../../db';

export async function GET(req) { 

  // console.log("req.query ==> ", req.query);
  const { searchParams } = new URL(req.url);
  const postNo = searchParams.get('postNo');
  console.log("req.query ==> ", postNo);

  try {
    // 클라이언트로부터 전송된 JSON 데이터를 파싱합니다.
    const results = await new Promise((resolve, reject) => {
      var sql = `SELECT * FROM comment_tbl WHERE POST_NO = '${postNo}' ORDER BY COMM_NO`;
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
    const insertResult = await new Promise((resolve, reject) => {
      db.query("INSERT INTO comment_tbl(COMMENT, U_ID, POST_NO) VALUES (?, ?, ?)"
            , [requestData.comment, requestData.uId, requestData.postNo], (err, result) => {
        if (err) {
          console.error('데이터 삽입 중 오류 발생:', err);
          reject(err);
        } else {
          console.log('데이터가 성공적으로 삽입되었습니다.');
          resolve(result);
        }
      });
    });
    return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.'})
  } catch (error) {
    console.error('POST 요청 처리 중 오류 발생:', error);
    return NextResponse.error('데이터를 처리할 수 없습니다.', 500);
  }
}

export async function PUT(req) {
  try {
    const updatedData = await req.json(); // 클라이언트가 전달한 업데이트할 데이터

    // 게시글 삭제 (업데이트) 작업. 완전히 삭제하지 않음
    const updateResult = await new Promise((resolve, reject) => {
      db.query("UPDATE comment_tbl SET DELYN = 'Y' WHERE COMM_NO = ?", [updatedData.postNo], (err, result) => {
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