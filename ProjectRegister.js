
//항상필요한 그주소
const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'

//엑세스토큰 받아오기
accessToken = localStorage.getItem('accessToken');

// 보낼때 본인이메일도 적어서 보내줄필요없음.
// 근데 한명도 안적어서 보내면 에러가뜸??

// 프로젝트 등록시키기
function RegisterProject(){
  var data = getData();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", $address+"/project", true); // 프로젝트 보내기 open
  xhr.setRequestHeader('Content-Type', 'application/json'); //형식확인
  xhr.setRequestHeader('Authorization',"Bearer " + accessToken); // 엑세스토큰
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) { //연결 성공시
        alert('success!');
        // 돌아가기
        history.back();
      }else{
        alert('fail!');
        localStorage.clear();
        location.href='/LogIn.html';
      }
    }
  }
  xhr.send(data);//데이터 보내기
}

function getData(){
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  // 개수구하기
  var size = document.getElementsByName("test").length;
  // 변수선언
  console.log(size);
  var  invitationEmail = [size];
  // 배열에 데이터입력
  for(let i=0; i<(size); i++){
    invitationEmail[i] = document.getElementsByName("test")[i].value;
  }

  data = JSON.stringify({
    description: description,
    invitationEmail: invitationEmail,
    title: title
  });
  console.log(data);
  return(data);
}