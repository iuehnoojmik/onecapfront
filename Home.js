const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'

//윈도우 실행시
window.onload=function(){
// storage에 저장된 accessToken과 email 받아오기  
  accessToken = localStorage.getItem('accessToken');
  email = localStorage.getItem('email');

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
        }
        else {
        // 오류시 localStorage를 초기화하고 로그인화면으로
        localStorage.clear();
        location.href='./Login.html';
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
      // json 형식으로 가져온걸로 프로젝트 화면만들기~~
        makediv(data[i].id, data[i].title, data[i].description)
      }
    }
  }
}

// 프로젝트들 있는 화면 만들기 div 만들어서 표현
function makediv(projectid,title,description){
  const element = document.getElementById('projects');
  
  const newdiv = document.createElement('div');
  const newdeletediv = document.createElement('div');

  // newdiv에 스타일 설정
  newdiv.classList.add('newdiv');
  // newdiv에 객체 id 설정
  newdiv.id = projectid;

  //삭제하는 div에 스타일추가
  newdeletediv.classList.add('deletediv')
  
  const deletediv_text = document.createTextNode("delete project")
  newdeletediv.append(deletediv_text)

  // 프로젝트 누를시 이동하는함수
  newdiv.onclick = function(){ 
    //클릭될시 projectid를 로컬 스토리지에project id로 저장
     localStorage.setItem('projectid',projectid);
    // 페이지 이동
    location.href="./Task/DnD.html";
  }
  
  // 프로젝트 삭제하는 oncllick 함수
  newdeletediv.onclick = function(){
    projectdelete(projectid);
  }


  const newtitle_div = document.createElement('div');
  newtitle_div.classList.add('title')

  const newdescription_div = document.createElement('div');
  newdescription_div.classList.add('describe')

  const newtitle = document.createTextNode("프로젝트 타이틀"+title);
  const newdescription = document.createTextNode("프로젝트 설명"+description);

  newtitle_div.append(newtitle);
  newdescription_div.append(newdescription);

  newdiv.append(newtitle_div,newdescription_div,newdeletediv);

  element.append(newdiv);
}


// 프로젝트 삭제
function projectdelete(projectid){
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", $address+'/project/'+projectid, true); 
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        //성공시 페이지 refresh
        location.href='./Home.html';
        }
        else {
        // 오류시 localStorage를 초기화하고 로그인화면으로
        localStorage.clear();
        location.href='./Login.html';
      }
    }
  }
  xhr.send();
}