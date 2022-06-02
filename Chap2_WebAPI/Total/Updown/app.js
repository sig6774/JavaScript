const gameData = {
    correct : Math.floor(Math.random() * 100) +1,
    // 실제 정답

    answer : null,
    // 사용자가 적은 답
    min : 1,
    max : 100
};

function makeNumber() {
    // 숫자를 생성 (1~100)
    const $numbers = document.querySelector('#numbers');
    // id가 numbers인 값 불러오기

    // virtual dom 생성 
    const $frag = document.createDocumentFragment();

    for (let i = gameData.min; i <= gameData.max; i++){
        const $num = document.createElement('div');
        // div 태그 생성
        $num.classList.add('icon');
        // div태그에 icon 클래스 추가

        $num.textContent = i;
        // 생성한 태그에 값 넣어줌
        $frag.appendChild($num);
        // 가상 dom에 생성한 요소를 자식으로 넣어주기
    }
    $numbers.appendChild($frag);
    // live dom에 virtual dom 넣기
    return $numbers;
}

// const ex = makeNumber();
// console.log(ex);
// 값이 제대로 생성되는 것을 확인

function checkAnswer($numbers, $target){
    // 실제 정답과 사용자 선택값을 가져와서 정답인지 판별해주는 함수

    const {
        correct, answer

        // 즉시 실행 함수를 통해서 answer값은 바뀜
    } = gameData;
    console.log('정답 값 : ' + correct);
    console.log('사용자 선택 값 : ' + $target);
    const $begin = document.getElementById('begin');
    // id가 begin인 값 가져오기
    const $end = document.getElementById('end');
    // id가 end인 값 가져오기

    
    if (correct === answer){
        // 사용자가 지정한 값과 실제 정답이 같다면
        processCorrect($target);
        // target값은 사용자가 클릭했을 때의 요소의 값  
        // 정답이라면 실행할 함수
        return;
    } else if (correct < answer){
        // 사용자가 클릭했을 떄의 요소 값이 정답보다 크다면 
        gameData.max = answer - 1;
        // 사용자가 입력한 값보다 작은 값안에 정답이 있음 
        $end.textContent = answer;
        executeUpDownAnimation(false);
    }else{
        // 사용자가 클릭했을 때의 요소 값이 정답보다 작다면
        gameData.min = answer + 1; 
        // 사용자가 입력한 값보다 큰 값 안에 정답이 있음
        $begin.textContent = answer;
        console.log($begin);
        executeUpDownAnimation(true);
    }

    clearNumberIcons($numbers);
    // 사용자가 클릭한 요소의 값에 맞도록 아이콘 재배치하기 위해 전체 삭제 

    makeNumber();
    // min과 max값이 변경되었기 때문에 그에 맞춰서 다시 숫자를 생성하고 배치
}

function clearNumberIcons($numbers){
    for (let $icon of [...$numbers.children]){
        // 매개변수로 받은 값을 반복문 돌림
        // 진짜 배열로 바꾸는 작업도 진행 
        $numbers.removeChild($icon);
        // 값 삭제
    }
}

function executeUpDownAnimation(isUp){
    // 사용자에게 힌트를 제공하는 animation
    console.log('execute 함수 매개값은 ? ' + isUp);
    document.querySelector('#up').classList.toggle('selected', isUp);
    // tag의 id가 up인 값에서 selected 클래스를 isUp(true, false)에 따라서 selected 클래스 추가 및 삭제 진행
    document.querySelector('#down').classList.toggle('selected', !isUp);
    // tag의 id가 down인 값에서 selected 클래스를 isUp(true, false)에 따라서 selected 클래스 추가 및 삭제 진행
    // up의 animation이 진행되면 down은 진행되면 안되기 때문에 !(not연산자 추가)
}

function processCorrect($target){
    // 사용자가 지정한 요소가 정답일 때 수행하는 함수
    const $finish = document.querySelector('.finish');
    $finish.classList.add('show');
    // 클래스 이름이 show인 것 추가
    $target.setAttribute('id', 'move');
    // 사용자가 지정한 요소가 정답일 때 id라는 속성을 추가해서 그 값을 move로 지정
}


(function () {

    const $numbers = makeNumber();

    $numbers.addEventListener('click', e => {
        if (!e.target.matches('#numbers > .icon')){
                // 지정한 태그가 맞다면인데 !이 붙어있으므로 아니라면
                // 잘못클릭을 방지하기 위해
                return;
        }
        console.log(`${e.target.textContent} 클릭`);

        gameData.answer = +e.target.textContent;
        // gameData의 객체의 answer를 사용자가 지정한 요소의 값으로 넣어줌
        // 숫자로 넣어줘야하기 때문에 +를 추가

        checkAnswer($numbers, e.target);
        
    })
}());