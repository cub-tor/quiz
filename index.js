let questions = [];
let category = -1;
let currentQuestion = 0;

//Ejemplo para ver con git las diferencias

//Llamar al JSON
const getData = () => {
  return fetch("./datos/data.json")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      questions = data;
      console.log(data);
	  load();
    });
};

getData();


//Elegir categoría o tema
function chooseCategory() {
	if (category < 5) {
		category = category+1;
	} else{
		category = 0;
	}
}
  
//Elegir pregunta al azar
function randomQuestion(max) {
	let randomNumber = Math.floor(Math.random() * max );
	currentQuestion = randomNumber;
	console.log("currentQuestion vale ",currentQuestion);
}

//Imprimir categoría
function printCategory() {
	let categoryNames = [
		"FÍSICA",
		"QUÍMICA",
		"MATEMÁTICAS",
		"CIENCIAS NATURALES",
		"MEDICINA",
		"TECNOLOGÍA",
	];
	let categoryImg = [];
	categoryImg[0] = "./img/imagen0.jpg";
	categoryImg[1] = "./img/imagen1.jpg";
    categoryImg[2] = "./img/imagen2.jpg";
	categoryImg[3] = "./img/imagen3.jpg";
	categoryImg[4] = "./img/imagen4.jpg";
	categoryImg[5] = "./img/imagen5.jpg";
	console.log("categoryImg vale ", categoryImg);

	let currentCategory= categoryNames[category];
	document.getElementById("categoria").innerHTML= currentCategory;
	console.log("currentCategory vale ", currentCategory);
	let currentImg= categoryImg[category];
	document.getElementById("imagen").src = currentImg;
	console.log ("currentImg vale ", currentImg);
}

//Imprimir la pregunta 
function printQuestion() {
	let pregunta = questions[category].preguntas[currentQuestion].Pregunta;
	console.log(pregunta);
	document.getElementById("pregunta").innerHTML=pregunta;
} 

// Imprimir las respuestas
function printAnswer() {
	let correcta = questions[category].preguntas[currentQuestion].correcta;
	document.getElementById("labelR1").innerHTML=correcta;
	let respuesta2 = questions[category].preguntas[currentQuestion].Respuesta2;
	document.getElementById("labelR2").innerHTML=respuesta2;
	let respuesta3 = questions[category].preguntas[currentQuestion].Respuesta3;
	document.getElementById("labelR3").innerHTML=respuesta3;

}

//Leer inputs y comparar input seleccionado con la respuesta correcta
function checkAnswer() {
	const inputR = document.querySelectorAll('input[name="respuesta"]');
	console.log("inputR es ", inputR);
	let selectedValue;
	for (const answer of inputR) {
		if (answer.checked) {
			selectedValue = answer.value;
			break;
		}
	}
 	console.log("selectedValue es: ",selectedValue);
	let rightAnswer=document.querySelector("#R1");
	 console.log("rightAnswer es: ", rightAnswer.value);
 	if (selectedValue == rightAnswer.value) {
		colorGoodScore("tema"+category);
	} else {
		colorBadScore("tema"+category);		
	}
	
}

//Funciones para colorear los cuadrados según se conteste bien o mal
function colorBadScore(id) {
	let square = document.getElementById(id);
	square.classList.add("red");
}

function colorGoodScore(id) {
	let square = document.getElementById(id);
	if (id == "tema0") {
		square.classList.add("green");
	} else if  (id == "tema1") {
		square.classList.add("orange");
	} else if (id == "tema2") {
		square.classList.add("yellow");
	} else if (id == "tema3") {
		square.classList.add("purple");
	}  else if (id == "tema4") {
		square.classList.add("blue");
	}  else if (id == "tema5") {
		square.classList.add("brown");
	}
}

//Función que comienza el cuestionario del siguiente tema, al terminar con un tema. Se activa con el botón respuesta
//desactiva el radio-input para que no aparezca marcado en la pregunta siguiente
//:checked - selecciona sólo los elementos "checked"
function processAnswer() {
	//comprobar respuesta
	checkAnswer();
	let radio= document.querySelector('input[name="respuesta"]:checked');
  		radio.checked = false;
		//Comprobar si es última categoría
		if (lastCategory()) {						
			//si es la última categoria pintar botón para recargar pantalla al hacer click
			printButton();
		}
		else {
			//si no es la última categoría cargar pregunta de la siguiente categoria salvo que sea la última categoria
			load();	
		}
	
}

//Función que indica la última categoría
function lastCategory() {
 	if (category==5) {
		return true;
	}
	else {
		return false;
	}
}

//pintar botón para volver a empezar la página (aparece sólo cuando se rellenan todos los cuadrados)
const button = document.getElementById("reset");
const buttonText = "Volver a jugar";
function printButton() {
  htmlCode = "";
  htmlCode += `<button id="jugar">${buttonText}</button>`;
  button.innerHTML = htmlCode;
}
button.addEventListener("click", reset);

//Función para recargar la página y volver a jugar
function reset() {
 let squares = document.querySelectorAll(".cuadroInterno");
	for (const square of squares) {
	  square.classList.remove("red");
	  square.classList.remove("green");
	  square.classList.remove("orange");
	  square.classList.remove("yellow");
	  square.classList.remove("purple");
	  square.classList.remove("blue");
	  square.classList.remove("brown");
	}
 button.innerHTML = "";
 category= -1;
 load();
}

//Función que llama a las funciones después de que se haya llamado al JSON, para asegurar que utilizan los datos 
function load() {
		
	//Elegir categoría o tema
	chooseCategory();

	//Conseguir un número de elementos por tema, para multiplicarlo por la función en randomQuestion
	let elements = Object.values(questions[category].preguntas);	
	console.log("elements ", elements);
	console.log(elements.length);

	//Elegir pregunta al azar
	randomQuestion(elements.length);

	console.log("pregunta random", questions[category].preguntas[currentQuestion]);

	//Imprimir la categoría, la pregunta y las respuestas
	printCategory();

	printQuestion();

	printAnswer();
}
