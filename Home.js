const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'

//윈도우 실행시
window.onload=function(){
// storage에 저장된 accessToken과 username 받아오기  
  accessToken = localStorage.getItem('accessToken');
  username = localStorage.getItem('username');
  email = localStorage.getItem('email');

  // 사용자이름 출력
  const element = document.getElementById('username');
  const newSpan = document.createTextNode('어서오세요! '+username+'님!');
  element.appendChild(newSpan);
  // 화면 정보 받아들이고 만들기
  load_project_data();
}

// 프로젝트 데이터 가져오기
function load_project_data(){
  // json 형식으로 가져와서 저장
  var data
  var xhr = new XMLHttpRequest();
  xhr.open("GET", $address+'/projects?email='+email, true); 
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        // console.log(xhr.responseText);
        //변환하여 저장
        data = JSON.parse(xhr.responseText);
        console.log(data[1].id);
        }
        else {
        // 오류시 localStorage를 초기화하고 로그인화면으로
        localStorage.clear();
        window.open('./Login.html');
      }
    }
  }
  xhr.send();
  xhr.onload = function(){
    if(data==undefined){
    // 프로젝트가 없습니다
    const element111 = document.getElementById('projects');
    const noprojectdiv = document.createElement('div')
    noprojectdiv.classList.add('newdiv');
    const noprojectdivs = document.createTextNode("프로젝트가 없습니다!");
    noprojectdiv.append(noprojectdivs);
    element111.append(noprojectdiv);
    } else {
      for(let i=0; i<data.length; i++){
        // 화면만들기~~
        makediv(data[i].id, data[i].title, data[i].description)
      }
      // json 형식으로 가져온걸로 프로젝트 화면 만들기
      console.log("there is data");
      console.log("배열 갯수"+data.length);
      console.log(data[1].id); 
    }
  }
}

// 프로젝트들 있는 화면 만들기 div 만들어서 표현
function makediv(projectid,title,description){
  const element = document.getElementById('projects');
  
  const newdiv = document.createElement('div')

  // newdiv에 스타일 설정
  newdiv.classList.add('newdiv');

  const newprojectid_div = document.createElement('div');
  const newtitle_div = document.createElement('div');
  const newdescription_div = document.createElement('div');

  const newprojectid = document.createTextNode("프로젝트 id"+""+projectid);
  const newtitle = document.createTextNode("프로젝트 타이틀"+title);
  const newdescription = document.createTextNode("프로젝트 설명"+description);

  newprojectid_div.append(newprojectid);
  newtitle_div.append(newtitle);
  newdescription_div.append(newdescription);

  newdiv.append(newprojectid_div,newtitle_div,newdescription_div);

  element.append(newdiv);

}

// 프로젝트 추가를 눌렀을때
function addproject(){
  window.open('./ProjectRegister.html');
}

// 프로젝트를 눌렀을때
function project_click(){
  // 프로젝트 id local storage에 저장

  // 페이지 이동
}

// 프로젝트 삭제
function projectdelete(){
  
}