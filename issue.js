

  const name = "서범수";

  function enterkey() {
    if (window.event.keyCode == 13) {
          //엔터키가 눌렸을때
          appendDiv()
      }
  }


function appendDiv() {
  const element = document.getElementById('div-middle');
  // new div 생성
  const newDiv = document.createElement('div');
  
  // new div에 style 추가
  newDiv.style.color = 'blue';
  newDiv.style.fontSize = '16px';
  
  // new div에 추가할 text node 생성
  const newText = document.createTextNode(
    name + ":"
    //text에 입력된 value를 구함
    +document.getElementById("text").value);
  
  // text node를 new div에 추가
  newDiv.appendChild(newText);
  
  // new div를 기존 div에 추가
  element.appendChild(newDiv);
};


// form.addEventListener('submit', function(e) {
// 	console.log('제출');
// })

