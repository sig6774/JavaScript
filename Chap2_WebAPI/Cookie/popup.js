function createCookie(name){
    const date= new Date();
    date.setDate(date.getDate() + 1);
    // 현재 날짜를 가져와서 쿠키의 수명을 하루로 지정
    let cookie = '';
    cookie += `${name}=${'true'};`;
    //쿠키 형식 생성 
    cookie += 'expires='+ date.toUTCString();
    document.cookie = cookie;
    // 쿠키를 넣어줌
}

function getCookie(name){
    const cookies = document.cookie.split(';');
    // cookie를 가지고 와서 ;을 기준으로 분할

    for (let c of cookies){
        if (c.search(name) !== -1){
            // 쿠키가 발견되었다면 
            return true;
        }
    }
}