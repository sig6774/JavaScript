//일정 데이터가 들어 있는 배열 선언
const todos = [{
        id: 1,
        text: '할 일 1',
        done: false //checkbox를 클릭해서 할 일을 마쳤는지의 여부
    },
    {
        id: 2,
        text: '할 일 2',
        done: false //checkbox를 클릭해서 할 일을 마쳤는지의 여부
    },
    {
        id: 3,
        text: '할 일 3',
        done: false //checkbox를 클릭해서 할 일을 마쳤는지의 여부
    },

];

const $list = document.querySelector('.todo-list');
function add($text) {
    console.log($text);
    // console.log(todos[1].id);
    // console.log(todos.length);
    // 값 추가 
    var ele = {id : todos.length + 1,
        text : $text.value,
        done : false};
    todos.push(ele);



    // dataset으로 접근해서 값을 넣고 
    // 나머지 값도 넣을까?
    // li요소를 가져와서 해당 값을 바꾼뒤 요소를 마지막에 추가하는 방법

    const $frag = document.createDocumentFragment();
    const $li = document.querySelector('.todo-list li');
    // console.log($li);

    const $copy = $li.cloneNode(true);
    // console.log($copy);
    $copy.dataset.id = ele.id;
    // console.log($copy.querySelector('.text').textContent);
    $copy.querySelector('.text').textContent = ele.text;

    // console.log()
    // done은 어디에 넣지?
    $list.appendChild($copy);
}

// 할일 완료 (체크박스) 이벤트 
// 체크박스를 체크하면 줄 긋고 바탕색을 회색으로 지정
// class 추가 
const $box = document.querySelectorAll('input[type="checkbox"]');
// console.log($box);
function check(event){
    // console.log(event.target.checked);

    // event.target.classList.toggle('checked', event.target.checked);
        // 스타일 먹여서 티나게 하기
    event.target.nextElementSibling.classList.toggle('checked', event.target.checked);
    // 이벤트가 발생한 체크박스의 형제노드를 찾아서 스타일을 추가
    // 형제노드가 텍스트임
    // 근데 왜 새로 생성한 요소는 안먹히는 거지?
    // console.log(event.target.nextElementSibling);
}

// 할일 삭제 이벤트 
// 아이콘 클릭하면 부모노드 전체 삭제
const $remove = document.querySelectorAll('.remove');

function deletecontent(event){
    // 이벤트가 발생했을 때 부모 노드 탐색
    console.log(event.target.parentNode.parentNode);

    console.log(event.target);
    // $list.remove(event.target.parentNode.parentNode);
    // 왜 모두 삭제가 되는거지?
}

const $update = document.querySelectorAll('.modify');
// console.log($update);
function updatecontent(event){
    // console.log(event.target);
    console.log(event.target.parentNode.parentNode);
    // 아니 근데 이거 왜 parentnode 두번 써야만 올라가는거지?
    let $te = event.target.parentNode.parentNode;
    console.log($te.querySelector('.text'));

    let $checkbox = $te.querySelector('.checkbox');
    let oldtag = $checkbox.querySelector('.text');
    console.log(oldtag);

    let text = oldtag.textContent;
    // 가상 dom으로 input 값 만들어서 교체해버릴까?
    let newtag = document.createElement('input');
    newtag.setAttribute('type', 'text');
    newtag.setAttribute('placeholder', text);
    newtag.setAttribute('onkeyup', 'if(window.event.keyCode==13){ function r(newtag.value = event.target.value)}');
    
    // 수정 버튼을 클릭하게 되면 input 태그로 바뀌면서 수정 모드 진입
    console.log(newtag);
    $checkbox.replaceChild(newtag, oldtag);
    // 태그 바뀜

    function enter(event){
        if (window.event.keyCode == 13){
            console.log(event.target.value);
            newtag.value = event.target.value;
        }

    }
    // 엔터치면 값을 넣어줌
    newtag.addEventListener('Enter', enter);



    


    // console.log($te.querySelector('.text').textContent);

    // $te.querySelector('.text').textContent = '';
    // 수정할 값 넣기

}




const $text = document.getElementById('todo-text');
const $btn = document.getElementById('add');
// console.log($text);
// console.log($btn);
// 메인 역할을 하는 즉시 실행 함수 
(function () {
    
    $btn.addEventListener('click', e => {
        console.log(`input값 : ${$text.value}`);
        // 값을 가져오는 것을 확인
        
        // 할일 추가 이벤트 
        add($text);

    })

    // 할일 완료(체크박스) 이벤트
    // 이벤트로 체크박스를 클릭하게 되면 해당 이벤트 객체를 가져와서 스타일 변경
    for ($a of $box){
        // 여러개의 박스를 quertselectall을 통해서 배열 생서 후 반복문 
        $a.addEventListener('click', check);
    }

    // 할일 삭제 이벤트 
    // 삭제 아이콘을 선택하게 되면 삭제

    for ($a of $remove){
        $a.addEventListener('click', deletecontent);
    }

    // 할일 수정 이벤트 (수정 모드 진입, 수정 완료)
    // 수정 아이콘을 선택하게 되면 text부분이 input으로 변경되면서 해당 값을 다시 입력하고 그 값을 넣어줌

    for ($b of $update){
        $b.addEventListener('click', updatecontent);
    }

    



}());