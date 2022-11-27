const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'
function login(form)
{
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    data = JSON.stringify({
        email: email,
        password: password,
    });

    var xhr = new XMLHttpRequest();
    xhr.open("POST", $address+'/login', true); 
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                // data변수에 JSON형식의 accessToken과 username 받아오기
                // JSON.parse를 통해 js가 읽을수있는 형식으로 변환
                var data = JSON.parse(xhr.responseText);
                // accessToken과 username 반환
                console.log(data.accessToken);
                console.log(data.username);
                // localStorage에 저장하기
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('username', data.username);
                // 이메일도 저장 왜 why? 바로다음에 사용해야함.
                localStorage.setItem('email', email);
                //페이지 이동
                window.open('Home.html');
            }
            else {
                alert("아이디 또는 비밀번호를 다시 확인하시오.")
            }
        }
    }
    xhr.send(data);
}


function signup(form)
{
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("name").value;

    data = JSON.stringify({
        email: email,
        password: password,
        username: username
    });

    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    xhr.open("POST", $address+'/signup', true); //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.setRequestHeader('Content-Type', 'application/json'); //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { //연결 성공시
                 // data변수에 JSON형식의 accessToken과 username 받아오기
                // JSON.parse를 통해 js가 읽을수있는 형식으로 변환
                var data = JSON.parse(xhr.responseText);
                // accessToken과 username 반환
                console.log(data.accessToken);
                console.log(data.username);
                // localStorage에 저장하기
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('username', data.username);
                // 이메일도 저장 왜 why? 바로다음에 사용해야함.
                localStorage.setItem('email', email);
                //페이지 이동
            }
            else {
                alert("이미 존재하는 이메일 또는 6자리 미만 비밀번호입니다.")
                //console.log("Error");
            }
        }
    }
    xhr.send(data); //Json형식의 data를 포함하여 요청 전송
}
