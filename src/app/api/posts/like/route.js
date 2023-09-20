import { NextResponse } from 'next/server'
import db from '../../../db';

import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) { 

  // console.log("req.query ==> ", req.query);
  const { searchParams } = new URL(req.url);
  const uId = searchParams.get('uId');
  console.log("req.query ==> ", uId);

  try {
    // 클라이언트로부터 전송된 JSON 데이터를 파싱합니다.
    const results = await new Promise((resolve, reject) => {
      var sql = "SELECT * FROM post_like_tbl";
      if(uId != ''){
        sql += ` WHERE U_ID = '${uId}'`;
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
    const requestData = await req.json();

    const insertResult = await new Promise((resolve, reject) => {
      db.query("INSERT INTO post_like_tbl VALUES (?, ?, now())"
            , [requestData.uId, requestData.postNo], (err, result) => {
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


export async function DELETE(req) {
  try {
    const requestData = await req.json();
    // 데이터 삭제 작업
    const deleteResult = await new Promise((resolve, reject) => {
      db.query('DELETE FROM post_like_tbl WHERE U_ID = ? AND POST_NO = ?',
        [requestData.uId, requestData.postNo], (err, result) => {
          if (err) {
            console.error('데이터 삭제 중 오류 발생:', err);
            reject(err);
          } else {
            console.log('데이터가 성공적으로 삭제되었습니다.');
            resolve(result);
          }
        });
    });

    return NextResponse.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error('DELETE 요청 처리 중 오류 발생:', error);
    return NextResponse.error('데이터를 삭제할 수 없습니다.', 500);
  }
}