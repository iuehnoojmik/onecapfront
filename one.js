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
    let Data= { // Body에 첨부할 json 데이터
        "email" : $(form.email.value),
        "password" : $(form.password.value),
        "username": $(form.username.value)
    };  

    $.ajax({
        url: $address+'/signup',
        data:JSON.stringify(Data),
        type:"POST",
        async:true,
        dataType:"JSON",
        contentType: "application/json; charset=utf-8",

        success:function(response){
            console.log(response);
        },

        error:function(e){
            alert("에러");
        }
    })
    

    /*if(form.mail.value=="") //아이디 데이터베이스랑 연결해야하는데 할 줄 몰라요
    {
        alert("Exist Id")
    }
    else{
        window.open('Home.html');
    }*/
}
