// 게임에 필요한 데이터 객체 뽑아오기 

const gameData = {

    secret: Math.floor(Math.random() * 100) + 1,
    answer: null,
    // 사용자가 클릭한 숫자를 읽어와서 입력
    min: 1,
    max: 100
};
console.log(gameData.min);
// const $numbers = document.getElementById('numbers');
// console.log($numbers);

// 숫자 아이콘 생성 함수
function makeNumberIcons() {
    const $numbers = document.getElementById('numbers');
    // console.log($numbers);

    // 가상 dom 컨테이너 생성
    const $frag = document.createDocumentFragment();

    for (let i = gameData.min; i <= gameData.max; i++) {
        // console.log(i);
        const $icon = document.createElement('div');
        $icon.classList.add('icon');
        // div태그의 icon 클래스 추가

        $icon.textContent = i;
        // icon에 값을 넣어줌
        $frag.appendChild($icon);
    }

    $numbers.appendChild($frag);
    // live dom에 생성된 가상 dom 넣음
    return $numbers;
}

// 아이콘 전체 삭제 함수 정의 
function clearNumberIcons($numbers) {
    // console.log('numbers : ' + $numbers);
    // console.log('children : ' + $numbers.children);


    for (let $icon of [...$numbers.children]) {
        console.log('icon : ' + $icon);

        $numbers.removeChild($icon);
    }
}

// up, down 애니메이션 작동 시킬 클래스 추가 제거 함수 정의
function executeUpDownAnimation(isUp) {
    console.log('execute : ' + isUp);
    document.querySelector('#up').classList.toggle('selected', isUp);
    document.querySelector('#down').classList.toggle('selected', !isUp);
}

// 정답을 맞췄을 때 처리를 수행할 함수 정의 
function processCorrect($target) {
    // 축하메시지 박스를 나타내게 하는 코드 
    const $finish = document.querySelector('.finish');
    // finish박스는 평소에 숨겨져있지만 이제 드러나도 된다는 뜻
    console.log($finish);

    $finish.classList.add('show');

    // 정답 아이콘 움직이게 하는 코드 
    $target.setAttribute('id', 'move');
}

// 정답을 판별해 주는 함수 정의 
function checkAnswer($numbers, $target) {
    // 객체에서 정답과 사용자의 선택값 가져오기
    const {
        secret,
        answer
    } = gameData;
    console.log('secret 값 : ' + secret);
    console.log($target);

    const $begin = document.getElementById('begin');
    const $end = document.getElementById('end');
    // 정답을 맞췄을 시 정답 처리하는 함수 호출
    // up or down일 경우 min과 max값 변경하고 함수 호출
    console.log('answer 값 : ' + answer);
    if (secret === answer) {
        processCorrect($target);
        return;
    } else if (secret < answer) {
        // down일 경우 
        gameData.max = answer - 1;
        console.log(gameData.max);
        $end.textContent = answer;
        executeUpDownAnimation(false);
    } else {
        // up인 경우 
        gameData.min = answer + 1;
        console.log(gameData.min);

        $begin.textContent = answer;
        executeUpDownAnimation(true);
    }

    // 판별 후 아이콘 재배치
    clearNumberIcons($numbers);
    makeNumberIcons();
    // 현재 랜더링 되어 있는 아이콘들을 전체 삭제
    // min과 max가 변경되어 있으므로 그에 맞춰서 아이콘 다시 배치
}

// const $number = makeNumberIcons();
// 핵심 실행 로직 즉시 실행 함수 (main역할)
(function () {
    // div id = numbers태그가 리턴
    const $numbers = makeNumberIcons();
    console.log($numbers);
    // 숫자 아이콘을 클릭했을 때의 이벤트(부모요소에 이벤트를 설정해서 전파)
    $numbers.addEventListener('click', e => {
        if (!e.target.matches('#numbers > .icon')) {
            console.log(e.target);
            return;
        }
        console.log(`${e.target.textContent} 클릭됨`);

        gameData.answer = +e.target.textContent;
        // 클릭 값을 answer에 넣어줌

        // 정답 체크 함수 호출 
        checkAnswer($numbers, e.target);
    })
}());