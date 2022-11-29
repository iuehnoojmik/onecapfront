// 서버와 연결하려고하는데 그주소
const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'

// 창이 켜지게되면 실행
window.onload=function(){
  // 로컬스토리지에서 id,accessToken,username 받아오기
  projectid = localStorage.getItem('projectid');
  accessToken = localStorage.getItem('accessToken');
  username = localStorage.getItem('username');
  // 서버로부터 데이터 받아오기
  issue_load()
}

// 이슈들을 확인(즉 데이터받음)
function issue_load(){
  var data;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", $address+'/issue/'+projectid, true); // 이슈들 확인
  xhr.setRequestHeader('Content-Type', 'application/json'); //형식확인
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken); // 엑세스토큰
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) { //연결 성공시
        // 확인된 데이터들 받기
        data = JSON.parse(xhr.responseText);
      }else{
        localStorage.clear();
        location.href='/LogIn.html';
      }
    }
  }
  xhr.send();
  // 데이터받은걸로 화면만들기
  xhr.onload = function(){
    if(data==undefined){
    // 이슈가 없습니다
    const element111 = document.getElementById('div_middle');
    const noissuediv = document.createElement('div')
    noissuediv.classList.add('newdiv');
    const noissuedivs = document.createTextNode("이슈가 없습니다!");
    noissuediv.append(noissuedivs);
    element111.append(noissuediv);
    } else {
      for(let i=0; i<data.length; i++){
      // json 형식으로 가져온걸로 프로젝트 화면만들기~~
        makediv(data[i].id, data[i].content, data[i].username)
      }
    }
  }
}

//엔터키가 눌렸을때 post issue하기
function enterkey() {
  if (window.event.keyCode == 13) { //엔터키가 눌렸을때
    var textdata = document.getElementById("text").value;
    if(textdata === undefined){
      alert('입력하세요 ㅡㅡ');
    }else{
      
      data = JSON.stringify({
        content: textdata,
      });
      issue_create(data);
    }
    //보냈을때 text의 value 초기화
    text.value = "";
  }
}

// 이슈들 데이터 서버로 보내기
function issue_create(data){
  var data;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", $address+'/issue/'+projectid, true); // 이슈 생성
  //엑세스토큰
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  // 보낼타입
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) { //연결 성공시
        console.log('success');
        location.href="./issue.html";
        //화면 초기화
      }else if(xhr.status === 400){
        alert('errorcode 400');
      }else{ // 실패시
        console.log('fail');
        //localStorage.clear();
        //location.href='/LogIn.html';
      }
    }
  }
  xhr.send(data); // data 보내기
}


// issue 삭제하기 코드
function issue_delete(deleteid){
  //
  var deleteid;
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", $address+'/issue/'+deleteid, true); // 이슈 생성
  // 엑세스토큰
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        // 삭제성공시 페이지 초기화
         location.href="./issue.html";
      }else{ // 실패시
        localStorage.clear();
        location.href='/LogIn.html';
      }
    }
  }
  xhr.send();
}

//확인된 데이터들을 div로 표현
function makediv(issueid,issuecontent,username) {
  // 생성할위치로 이동
  const element = document.getElementById('div-middle');
  // new div 생성
  const newDiv = document.createElement('div');
  // new div class 부여
  newDiv.classList.add('newDiv');
  // new span 생성
  const newissueidSpan = document.createElement('span');
  const newusernameSpan = document.createElement('span');
  const newissuecontentSpan = document.createElement('span');
  // span에 내용넣기
  newissueidSpan.appendChild(document.createTextNode(issueid));
  newusernameSpan.appendChild(document.createTextNode(username));
  newissuecontentSpan.appendChild(document.createTextNode(issuecontent));
  // Span들에게 각각의 class 부여하기
  newissueidSpan.classList.add('issueidSpan')
  newusernameSpan.classList.add('usernameSpan')
  newissuecontentSpan.classList.add('issuecontentSpan')
  // text node를 new div에 추가
  newDiv.appendChild(newissueidSpan);
  newDiv.appendChild(newusernameSpan);
  newDiv.appendChild(newissuecontentSpan);

  // 삭제하는 span추가
  const newdeleteissueSpan = document.createElement('span');
  newdeleteissueSpan.appendChild(document.createTextNode('X'));
  newdeleteissueSpan.classList.add('deleteissueSpan');
  newdeleteissueSpan.onclick = function(){
    const deleteid=issueid;
    issue_delete(deleteid);
  }
  newDiv.appendChild(newdeleteissueSpan);
  // new div를 기존 div에 추가
  element.appendChild(newDiv);
}