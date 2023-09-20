export function GetDB(props){
    console.log(`/api/${props.dbName}?${props.paramName}=${props.paramValue}`);
    return fetch(`/api/${props.dbName}?${props.paramName}=${props.paramValue}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
              }
              return response.json();
            });
}