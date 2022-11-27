// 서버와 연결하려고하는데 그주소
const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'

var xhr = new XMLHttpRequest();
xhr.open("GET", $address+'/issue/{id}', true); // 이슈들 확인
xhr.open("POST", $address+'/issue/{id}', true); // 이슈 생성
xhr.open("DELETE", $address+'/issue/{id}', true); // 이슈 삭제


// email 필요함
// 헤더부분에서 따로 받을수 있다고함.

//프로젝트 ID받기
function getemail(){
  xhr.open("GET", $address+'/projects')
  //연결되있는지 확인
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) { 
            alert("문제없음")

        }
        else {
            alert("아이디 또는 비밀번호를 다시 확인하시오.")
        }
    }
}
  console.log(email);
}



// JSON 형식으로 텍스트 저장하기
textdata = JSON.stringify({
  text: document.getElementById("text").value
});


// 이슈들 데이터 서버로 보내기
function data_create(){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", $address+'/issue/1', true); // 이슈 생성
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(textdata); // data 보내기
}


// 이슈들을 확인(즉 데이터받음)
function data_load(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", $address+'/issue/{id}', true); // 이슈들 확인
  xhr.setRequestHeader('Content-Type', 'application/json'); //형식확인??
  // 텍스트 받아들이기
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) { //연결 성공시
        // 확인된 데이터들 받기
        
      }
    }
  }
}

// 데이터베이스통해서 받아오기
const name = "서범수";

function enterkey() {
  if (window.event.keyCode == 13) { //엔터키가 눌렸을때
    //송출화면으로 데이터 보내기
    appendDiv();
    //보냈을때 text의 value 초기화
    text.value = "";
  }
}

//확인된 데이터들을 div로 표현
function appendDiv() {
  // 생성할위치로 이동
  const element = document.getElementById('div-middle');
  // new div 생성
  const newDiv = document.createElement('div');
  // new span 생성
  const newSpan = document.createElement('span');
  
  // new div에 style 추가
  newDiv.style.color = 'balck';
  newDiv.style.fontSize = '16px';
  // span 의 style 설정
  newSpan.style.backgroundColor ="aqua";
  newSpan.style.margin="10px";
  newSpan.style.borderRadius= "6px";

  // new div에 추가할 span 생성
  const newSSpan = document.createTextNode(
    name
    );
  // new div에 추가할 text node 생성
  const newText = document.createTextNode(
    //text에 입력된 value를 구함
    document.getElementById("text").value
    );
  // text node를 new div에 추가
  newSpan.appendChild(newSSpan);
  newDiv.appendChild(newSpan);
  newDiv.appendChild(newText);
  
  // new div를 기존 div에 추가
  element.appendChild(newDiv);
};

