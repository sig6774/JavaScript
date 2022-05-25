

// 필요한 데이터 : 랜덤 숫자, 횟수 카운트, 카운트다운, 최소값, 최대값

// 최대 범위를 저장할 변수 
const MAX = 100;
// 바뀌지 않을 값

// 게임에 필요한 데이터 객체 
const gameData = {
    secret_num : Math.floor(Math.random() * MAX + 1),
    // 1~ 101미만 난수 생성 (정답 값)
    count : 0,
    countDown : 6,
    min : 1,
    max : MAX
}

// 함수 정의 

// 사용자의 입력을 수행하는 함수 
function inputNumber() {
    // 객체에서 min과 max의 값을 뽑아서 메세지를 완성
    const min = gameData.min;
    const max = gameData.max;

    // 객체 디스트럭쳐링 : 데이터 참조시에만 사용 가능
    // const{ min, max } = gameData;
    // 객체의 property의 이름이 같아서 사용가능

    // 사용자의 입력값을 객체에 추가
    gameData.answer = +prompt(`숫자를 입력하세요! [${min} ~ ${max}]`);
    // ``(백틱)과 ${}를 이용하여 값과 문자를 한번에 보여줄 수 있음
    gameData.count++;
    gameData.countDown--;

    return checkNumber();
}

// 사용자의 입력값을 검증하는 함수 
function checkNumber() {

    const {secret_num, count, answer, countDown } = gameData;
    // 4개의 값을 한번에 가지고 올 수 있음

    if (answer === secret_num){
        alert('정답입니다!!' + count + '번 만에 맞추셨군요!!');
        checkCountDown(count);
        return true;
        // return 값은 inputnumber로 가고 이후 while문 진행
    }
    else if (secret_num > answer) {
        // 사용자가 입력한 값이 정답보다 작을 때 
        alert('UP!');
        gameData.min = answer + 1;
        // 값 갱신
    }
    else{
        // 사용자가 입력한 값이 정다봅다 클 때 
        alert('DOWN!');
        gameData.max = answer - 1;
        // 값 갱신
    }
    alertCountDown(countDown);

    return false
}

// 사용자의 남은 시도 횟수를 알려주는 함수 
function alertCountDown(countdown){
    if (countdown > 0){
        alert('정답 기회 ' + countdown + '번 남음!');
    } else{
        alert('정답 기회 모두 소진! 문제를 계속 풀어주세요.');
    }
}

// 사용자의 시도 횟수를 받아서 게임의 승리 유무를 판단 
function checkCountDown(countdown){
    if (countdown > 0 ){
        alert('YOU WIN!!');
    }else{
        alert('YOU LOSE!!');
    }
}


// 핵심 실행부(자바의 main의 역할)
// 즉시 실행 함수로 선언하여 따로 호출하지 않아도 바로 실행될 수 있도록 작성


(function() {
    alert('[UP & DOWN 게임 - 1 ~ 100사이의 숫자를 맞춰보세요!]');

    while(!inputNumber()){
        // inputNumber가 false가 리턴되면 게임 계속 진행 

    }
} () );