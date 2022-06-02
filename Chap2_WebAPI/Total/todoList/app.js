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
// ======================================================================
// 할 일 추가

function insertToDoDate() {
    console.log('할 일 추가 함수 호출');

    const $todoText = document.getElementById('todo-text');
    // console.log($todoText);
    // 입력값이 없다면 추가 처리 하지 않기 위한 로직 작성
    // 공백이 들어갈 가능성도 제거

    if ($todoText.value.trim() === '') {
        // 요소의 값에서 공백을 제거했을 때 값이 비어있다면 
        $todoText.style.background = 'orangered';
        $todoText.setAttribute('placeholder', '필수 입력 사항');
        $todoText.value = '';
        alert('값을 입력하세요');
        return;

    } else {
        // 제대로 입력이 되었다면 속성과 디자인 초기화
        $todoText.setAttribute('placeholder', '할 일을 입력하세요');
        $todoText.style.background = '';
        // console.log($todoText);
    }


    // 1. todos 배열에 객체를 생성한 후 추가 
    const newTodo = {
        id: makeNewId(),
        text: $todoText.value,
        done: false
    };
    todos.push(newTodo);

    // 2. 추가된 데이터를 화면에 표시(li태그 추가)
    // 생성한 객체를 새로운 요소로 생성한 곳에 객체를 넣어줌
    makeNewToDoNode(newTodo);

    // 3. 입력 완료 후 input에 존재하는 문자열을 제거 
    $todoText.value = '';
}
// console.log($todoText);

// 추가될 할 일 객체의 id 생성해주는 함수
function makeNewId() {
    if (todos.length > 0) {

        return todos[todos.length - 1].id + 1;
        // 객체의 길이에 +1 해주면 됨
    } else {
        return 1
    }
}

// ========================================================================
// 할 일 수정 

// 화면에 표현할 .todo-list-item 노드를 생성하는 함수 정의 
function makeNewToDoNode(newTodo) {
    const $li = document.createElement('li');
    const $label = document.createElement('label');
    const $divMod = document.createElement('div');
    const $divRemove = document.createElement('div');

    // label 태그 작업
    $label.classList.add('checkbox');
    const $check = document.createElement('input');
    $check.setAttribute('type', 'checkbox');

    const $span = document.createElement('span');
    $span.classList.add('text');
    $span.textContent = newTodo.text;
    $label.appendChild($check);
    $label.appendChild($span);

    // $label.innerHTML = `<input type = "checkbox">
    // <span class="text">${newTodo.text}</span>`;

    // 수정 div 태그 작업
    $divMod.classList.add('modify');
    const $modIcon = document.createElement('span');
    $modIcon.classList.add('lnr', 'lnr-undo');
    $divMod.appendChild($modIcon);

    // 삭제 div 태그 작업
    $divRemove.classList.add('remove');
    const $removeIcon = document.createElement('span');
    $removeIcon.classList.add('lnr', 'lnr-cross-circle');
    $divRemove.appendChild($removeIcon);

    // li태그 작업 
    $li.dataset.id = newTodo.id;
    // data-id에 값을 넣어줌 
    $li.classList.add('todo-list-item');
    for (let $ele of [$label, $divMod, $divRemove]) {
        $li.appendChild($ele);
    }

    // 실제 livedom인 ul태그에 값을 넣어줌 
    const $ul = document.querySelector('.todo-list');
    $ul.appendChild($li);
}



// 인덱스를 가져오는 함수
function findIndexByDataId(dataIndex) {
    for (let i = 0; i < todos.length; i++) {
        if (dataIndex === todos[i].id) {
            return i;
        }
    }
}
// 체크박스의 상태를 변경해주는 함수
function changeCheckState($label) {
    // 할 일 완료된 노드의 클래스 추가 
    // 디자인을 주기 위해서 
    // 디자인을 상황에 따라서 추가, 삭제할 수 있어야하기 때문에 toggle 사용
    $label.classList.toggle('checked');
    
    // dataId를 기반으로 배열을 탐색하여 data-id와 일치하는 id 프로퍼티를 가진 객체의 인덱스를 얻어올 예정
    const dataId = +$label.parentNode.dataset.id;
    // label의 부모요소인 li의 data-id를 가지고 옴 (숫자형식)
    
    const index = findIndexByDataId(dataId);
    
    todos[index].done = !todos[index].done;
    // true와 false만 있으므로 not 연산자를 사용
}

// ====================================================================
// 할 일 삭제 
function removeToDoDate($delTarget){
    // 애니메이션 적용을 위해 클래스 이름을 추가
    $delTarget.classList.add('delMoving');

    // removeChild 진행 전 애니메이션을 발동 및 배열 내부 객체 삭제 진행 될 수 있도록 시간 지연
    setTimeout(() => {
        document.querySelector('.todo-list').removeChild($delTarget);
        // ul태그의 자식요소인 li태그를 삭제 
        // li태그는 매개변수로 들어왔음
    }, 1500);
    
    // 배열 내에 있는 객체도 삭제 진행
    const index = findIndexByDataId(+$delTarget.dataset.id);
    // 매개변수로 받은 것의 data-id의 값의 인덱스를 가져옴 
    // 지리네 이래서 작은 기능이라도 함수를 만들어서 사용하는거네

    todos.splice(index, 1);
    // splice를 사용하여 지정한 인덱스부터 한개만 삭제
}

// ===================================================================
// 할 일 수정 

// 수정 모드 진입 이벤트 함수 
function enterModifyMode($modSpan){
    // 수정 아이콘이 있는 span태그를 매개함수로 받음 

    // 수정 모드 진입 버튼 교체 
    // (lnr-undo -> lnr-checkmark-circle)
    $modSpan.classList.replace('lnr-undo', 'lnr-checkmark-circle');
    // replace를 활용하여 클래스 변경 

    // span태그를 input 태그로 변경 
    // span태그는 매개변수에서 부모노드의 형제노드의 자식노드임 
    const $label = $modSpan.parentNode.previousElementSibling;

    const $textspan = $label.lastElementChild;
    // 지워야 할 span 태그 지명

    const $modInput = document.createElement('input');
    $modInput.setAttribute('type', 'text');
    $modInput.classList.add('mod-input');
    $modInput.setAttribute('value', $textspan.textContent);
    // 새로운 input 태그 만듬 

    $label.replaceChild($modInput, $textspan);
    // 새롭게 만든 input 태그를 기존에 있던 span태그와 교체 
}

// 수정 완료 이벤트 처리 함수 <- 이거 수정 완료 후 다시 버튼 돌려놓고 값 들어가는게 안됨
function modifyToDoData($modCompleteSpan){
    
    // 수정을 완료하면 버튼을 다리 돌려놓음 
    $modCompleteSpan.classList.replace('lnr-checkmark-circle', 'lnr-undo');

    // input태그를 다시 span.text로 변경 
    const $label = $modCompleteSpan.parentNode.previousElementSibling;
    const $modInput = $label.lastElementChild;

    // span 태그 생성 및 값 넣음
    const $textspan = document.createElement('span')
    $textspan.textContent = $modInput.value;
    $textspan.classList.add('text');

    $label.replaceChild($textspan, $modInput);
    // 태그 바꿔줌

    // 객체에도 수정한 값을 넣어줌
    const idx = findIndexByDataId(+$label.parentNode.dataset.id);
    todos[idx].text = $textspan.textContent
    console.log(todos);
}

// ====================================================================
// 이벤트 발생시 실행되는 함수

// add의 클릭이 발생했을 때 실행할 함수
function clickevent(event) {
    // event.preventDefault();
    // 버튼의 고유 기능(submit) 없앰
    insertToDoDate();
}

// checkbox 변동이 발생했을 때 불러오는 함수 
function changeevent(event) {
    if (!event.target.matches('input[type=checkbox]')) {
        // 이벤트가 발생한 영역이 지정한 이름이 아니면 함수 종료 
        return;
    }

    changeCheckState(event.target.parentNode);
    // label을 함수의 매개값으로 전달하기 위해서
}

// 삭제 이벤트 발생시 사용하는 함수 
function deleteevent(event){
    if (!event.target.matches('.todo-list .remove span')){
        // 이벤트가 발생한 영역이 삭제 아이콘을 지정하지 않았다면 함수 종료 
        return;
    }
    removeToDoDate(event.target.parentNode.parentNode);
    // event.target은 span태그이며 부모의 부모태그는 li태그
    // li태그를 매개변수로 보내줌
}

// 수정 이벤트 발생 시 사용하는 함수 
function updateevent(event){
    // 수정아이콘이 수정모드일 때와 수정을 시작 및 완료할 때 다르기 때문에 
    if (event.target.matches('.todo-list .modify span.lnr-undo')){
        // 이벤트가 발생한 영역이 span태그의 수정 아이콘의 lnr-undo이면 
        enterModifyMode(event.target);
        // 수정 모드 진입
    } else if (event.target.matches('.todo-list .modift span.lnr-checkmark-circle')){
        modifyToDoData(event.target);
        // 수정모드에서 수정을 확정짓기 위해 
    } else{
        return;
    }
}

// =========================================================================
// 메인 역할을 하는 즉시 실행 함수 
(function () {

    // 할 일 추가 이벤트 
    const $addBtn = document.getElementById('add');
    $addBtn.addEventListener('click', clickevent);
    // 버튼에 클릭이라는 이벤트가 발생했을 때 

    // 할 일 완료 이벤트    
    const $todoList = document.querySelector('ul.todo-list');

    $todoList.addEventListener('change', changeevent);

    // 할 일 삭제 이벤트
    $todoList.addEventListener('click', deleteevent);
    // 클릭이 발생한다면 

    // 할 일 수정 이벤트 
    $todoList.addEventListener('click', updateevent);




}());