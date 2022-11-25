const example1 = document.querySelector('#cb1');
const example2 = document.querySelector('#cb2');
const example3 = document.querySelector('#cb3');
const example4 = document.querySelector('#cb4');
const example5 = document.querySelector('#cb5');

const low = document.querySelector('#low');
const middle = document.querySelector('#middle');
const high = document.querySelector('#high');

function example_1() {
	if(example1.checked == true) {
    example2.checked = false;
    example3.checked = false;
    example4.checked = false;
    example5.checked = false;
    }
}
function example_2() {
	if(example2.checked == true) {
    example1.checked = false;
    example3.checked = false;
    example4.checked = false;
    example5.checked = false;
    }
}
function example_3() {
	if(example3.checked == true) {
    example1.checked = false;
    example2.checked = false;
    example4.checked = false;
    example5.checked = false;
    }
}
function example_4() {
	if(example4.checked == true) {
    example1.checked = false;
    example2.checked = false;
    example3.checked = false;
    example5.checked = false;
    }
}
function example_5() {
	if(example5.checked == true) {
    example1.checked = false;
    example2.checked = false;
    example3.checked = false;
    example4.checked = false;
    }
}

function ex_1() {
  if(low.checked == true) {
    middle.checked = false;
    high.checked = false;
  }
}

function ex_2() {
  if(middle.checked == true) {
    low.checked = false;
    high.checked = false;
  }
}

function ex_3() {
  if(high.checked == true) {
    middle.checked = false;
    low.checked = false;
  }
}