const $address = 'http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com'
function check(form)
{
    //ajax실행시키고 받은 값을 bad/ok
    if(form.mail.value=="onecap@cbnu.com") //아이디 입력 바꾸기
    {
        if(form.password.value=="1111") //패스워드 입력 바꾸기
        {
            window.open('Home.html')
        }
        else
        {
            alert("Wrong Password");
        }
        
    }
    else{
        alert("Wrong Email(ID)");
    }
}


function join_check(form)
{
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("name").value;

	//보낼 데이터를 Json문자열로 변환
    data = JSON.stringify({
        email: email,
        password: password,
        username: username
    });

    var xhr = new XMLHttpRequest(); // XMLHttpRequest 객체 생성
    //요청을 보낼 방식, 주소, 비동기 여부 설정
    xhr.open("POST", "http://ec2-43-201-47-225.ap-northeast-2.compute.amazonaws.com/signup", true);
    //요청 해더에 컨텐츠 타입 Json으로 사전 정의
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) { // 200은 에러가 없다는 뜻
                console.log("연결 성공");
            } else {
                console.log("연결 실패");
            }
        }
    }
    //Json형식의 data를 포함하여 요청 전송
    xhr.send(data);
    

    /*if(form.mail.value=="") //아이디 데이터베이스랑 연결해야하는데 할 줄 몰라요
    {
        alert("Exist Id")
    }
    else{
        window.open('Home.html');
    }*/
}
