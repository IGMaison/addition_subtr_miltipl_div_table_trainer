	
	var yes = 0; 					//правильные ответы
	var no = 0;					//неправильные ответы	
	var est, qty, answ, actns, digits, curr_exam;   //оценка, количество задач, действия в задачах, разрядность чисел, текущий пример с ответом
	


function popup_check () {
	
	document.getElementById('overlay').style.display='none';
	let radios = document.querySelectorAll('input[name="razr"]');
	for (let radio of radios) {
		if (radio.checked) {
			digits = radio.value;			
		}
	}
	
	actns = document.getElementById('actions').value;
	qty = document.getElementById('ex_qty').value;
	write_exam()

}



function check () {

		answ = parseInt(document.getElementById("answ").value);
		if (Number.isInteger(answ)) {
			if (answ === curr_exam.r_answ){
				yes += 1;
				alert("ВЕРНО! Молодец!");
			}
			else {
	      	     		no += 1;
	      	      		alert(`${no}Неверно. Правильный ответ: ${curr_exam.quest} = ${curr_exam.r_answ}`);
			}
			return true;
		}
		else {
			return false;
		}
	}



function create_exam () {

	let exam = {}
	let actn, sign, quest, r_answ;
	a = ((Math.random() * 9 * 10 ** (digits - 1))^0) + 10 ** (digits - 1);
	b = ((Math.random() * 9 * 10 ** (digits - 1))^0) + 10 ** (digits - 1);
	if (a === 0){a = 10 ** digits - 1;}
	if (b === 0){b = 10 ** digits - 1;}
	
	switch (actns) {
		case '+':
			actn = 0;
			break;
		case '+-':
			actn = (2 * Math.random())^0;
			break;
		case '*':
			actn = 2;
			break;
		case '*/':
			actn = (2 * Math.random())^0 + 2;
			break;
		case '+-*/':
			actn = (4 * Math.random())^0;
			break;
	}		
	switch (actn) {
		case 0:
			quest = a + " + " + b;
			r_answ = a + b;
			break;
		case 1:
			if (a >= b) {
				quest = a + " - " + b;
				r_answ = a - b;
			}
			else {				
				quest = b + " - " + a;
				r_answ = b - a;
			}
			break;
		case 2:
			quest = a + " * " + b;			
			r_answ = a * b;
			break;
		case 3:
			quest = a * b + " / " + b;			
			r_answ = a;
			break;
	}
		
	exam = {quest: quest,
		r_answ: r_answ
		}
	return exam;


}



function write_exam () {

	curr_exam = create_exam();
	document.getElementsByClassName("task_name")[0].innerHTML = "Сколько будет " + curr_exam.quest + " = ?";	

		
}



function checking_btn (x){

	if (qty > 0){
	
		if (check()) {
			qty -= 1;
		        est = Math.round(50 * yes / (yes + no)) / 10;
			if (qty > 0){
				//alert(`Сейчас твоя оценка ${est} Осталось примеров ещё: ${qty}шт.\n`);-----------------
				write_exam();
			}
			else {
				return finish();
			}
			
	        }
		else {
			alert(`Ответ должен быть числом.`);
		}
		document.getElementById("answ").value = '';
		if (x) {
		document.getElementById("answ").focus();
		}
	
	}
	
}



function finish () {		
    
        	
	let after_point = est - parseFloat(est^0);	
	if (est === 5) {
		est = '5+ !!!';
	}
        else if (after_point >= 0.9) {
            est = est^0 + 1;
	}
        else if (after_point < 0.5) {
            est = String(est^0) + '+';
	}
        else {
            est = String((est + 1)^0) + "-";
	}
        alert(`\n\nТренировка закончена.\nПравильных ответов: ${yes}. Неправильных: ${no}.\nОкончательная оценка: ${est}`)

}



function write_num(n) {
	if (n === -1) {
		let str = document.getElementById("answ").value;
		document.getElementById("answ").value = str.substr(0, str.length - 1);
	}
	else {
		document.getElementById("answ").value += n + '';	
	}

}


function exersise () {
	
	document.getElementById('overlay').style.display='block';
	document.getElementById("answ").value = ''
	
}
