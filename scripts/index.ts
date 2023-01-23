let windowDiv = document.getElementById("window-div");
let resultDiv = document.getElementById("result");
let optionalButton = document.getElementById("optional-buttons");
let maximizeButton = document.getElementById("maximize-button");

document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("calculatorPosition")) {
		let prevPosition = JSON.parse(localStorage.getItem("calculatorPosition")!);
		if (windowDiv) {
			windowDiv.style.top = prevPosition.y + "px";
			windowDiv.style.left = prevPosition.x + "px";
		}
	}

	if (localStorage.getItem("calculatorMaximized") === "true") {
		if (optionalButton) optionalButton.style.display = "flex";
	} else {
		if (optionalButton) optionalButton.style.display = "none";
	}
	if (resultDiv) resultDiv.addEventListener("mousedown", dragMouseDown);
	if (maximizeButton)
		maximizeButton.addEventListener("click", handleMaximizeButtonClick);
});

var initialX = 0,
	initialY = 0,
	finalX = 0,
	finalY = 0;

function dragMouseDown(e: MouseEvent) {
	e.preventDefault();

	finalX = e.clientX;
	finalY = e.clientY;

	document.addEventListener("mouseup", handleMouseUp);
	document.addEventListener("mousemove", handleDrag);
}

function handleDrag(e: MouseEvent) {
	e = e || window.event;
	e.preventDefault();
	initialX = finalX - e.clientX;
	initialY = finalY - e.clientY;
	finalX = e.clientX;
	finalY = e.clientY;
	if (windowDiv) {
		let y = windowDiv.offsetTop - initialY;
		let x = windowDiv.offsetLeft - initialX;

		if (x < 0) x = 0;
		if (y < 0) y = 0;
		window.innerWidth;
		if (x + windowDiv.offsetWidth > window.innerWidth)
			x = window.innerWidth - windowDiv.offsetWidth;
		if (y + windowDiv.offsetHeight > window.innerHeight)
			y = window.innerHeight - windowDiv.offsetHeight;
		windowDiv.style.top = y + "px";
		windowDiv.style.left = x + "px";

		localStorage.setItem("calculatorPosition", JSON.stringify({ x, y }));
	}
}

function handleMouseUp() {
	document.removeEventListener("mouseup", handleMouseUp);
	document.removeEventListener("mousemove", handleDrag);
}

function handleMaximizeButtonClick() {
	if (optionalButton) {
		if (optionalButton.style.display === "none") {
			optionalButton.style.display = "flex";
			localStorage.setItem("calculatorMaximized", "true");
		} else {
			optionalButton.style.display = "none";
			localStorage.setItem("calculatorMaximized", "false");
		}
	}
}

// Calculator.ts
function factorial(num: number) {
	let factorial = 1;
	for (let i = 1; i <= num; i++) {
		factorial = factorial * i;
	}
	return factorial;
}

const calculate = (
	operand: string,
	operator: string,
	result: string
): string => {
	switch (operator) {
		case "+":
			{
				operand = `${parseFloat(operand) + parseFloat(result)}`;
			}
			break;
		case "-":
			{
				operand = `${parseFloat(operand) - parseFloat(result)}`;
			}
			break;
		case "x":
			{
				operand = `${parseFloat(operand) * parseFloat(result)}`;
			}
			break;
		case "/":
			{
				operand = `${parseFloat(operand) / parseFloat(result)}`;
			}
			break;
	}
	return operand;
};

var operatorPressed: boolean = false;
var operatorLastClicked: boolean = false;
var currentOperator: string;
var operand1: number;
var operand2: number;

const buttons = document.querySelector("#buttons");
const result = document.querySelector("#result") as HTMLDivElement;

buttons?.addEventListener("click", (event) => {
	let btn = event.target as HTMLButtonElement;
	if (btn.classList.contains("number")) {
		if (operatorLastClicked) {
			operatorLastClicked = false;
			result.innerText = btn.innerText;
		} else if (result.innerText !== "0") {
			if (btn.innerText === ".") {
				if (!result.innerText.includes("."))
					result.innerText = result.innerText.concat(btn.innerText);
			} else {
				result.innerText = result.innerText.concat(btn.innerText);
			}
		} else {
			result.innerText = btn.innerText;
		}
		updateResultFontSize();
	}
	if (btn.classList.contains("operator")) {
		if (btn.innerText === "%" && result.innerText !== "0") {
			result.innerText = "" + parseFloat(result.innerText) / 100;
			operand1 = parseFloat(result.innerText);
		} else if (!operatorPressed) {
			operand1 = parseFloat(result.innerText);
			operatorPressed = true;
			currentOperator = btn.innerText;
		} else {
			operand1 = parseFloat(
				calculate(`${operand1}`, currentOperator, result.innerText)
			);
			result.innerText = "" + operand1;
			currentOperator = btn.innerText;
			operand1 = +result.innerText;
		}
		operatorLastClicked = true;
		updateResultFontSize();
	}
	if (btn.classList.contains("equals")) {
		if (operatorPressed && !operatorLastClicked) {
			operand1 = parseFloat(
				calculate(`${operand1}`, currentOperator, result.innerText)
			);
			result.innerText = "" + operand1;
			updateResultFontSize();
		}
		updateResultFontSize();
	}
	if (btn.classList.contains("clear")) {
		result.innerText = "0";
		operand1 = 0;
		operatorPressed = false;
		operatorLastClicked = false;
	}
	if (btn.classList.contains("negative")) {
		result.innerText = `${parseFloat(result.innerText) * -1}`;
	}
	updateResultFontSize();
});

document.querySelector("#square")?.addEventListener("click", () => {
	if (result.innerText !== "0") {
		result.innerText = `${
			parseFloat(result.innerText) * parseFloat(result.innerText)
		}`;
		updateResultFontSize();
	}
});
document.querySelector("#cube")?.addEventListener("click", () => {
	if (result.innerText !== "0") {
		result.innerText = `${
			parseFloat(result.innerText) *
			parseFloat(result.innerText) *
			parseFloat(result.innerText)
		}`;
		updateResultFontSize();
	}
});
document.querySelector("#square-root")?.addEventListener("click", () => {
	if (result.innerText !== "0") {
		result.innerText = `${Math.sqrt(parseFloat(result.innerText))}`;
		updateResultFontSize();
	}
});
document.querySelector("#cube-root")?.addEventListener("click", () => {
	if (result.innerText !== "0") {
		result.innerText = `${Math.cbrt(parseFloat(result.innerText))}`;
		updateResultFontSize();
	}
});
document.querySelector("#quardic-root")?.addEventListener("click", () => {
	if (result.innerText !== "0") {
		result.innerText = `${Math.pow(parseFloat(result.innerText), 1 / 4)}`;
		updateResultFontSize();
	}
});
document.querySelector("#reciprocal")?.addEventListener("click", () => {
	if (result.innerText !== "0") {
		result.innerText = `${1 / parseFloat(result.innerText)}`;
		updateResultFontSize();
	}
});
document.querySelector("#factorial")?.addEventListener("click", () => {
	if (result.innerText !== "0") {
		result.innerText = `${factorial(parseFloat(result.innerText))}`;
		updateResultFontSize();
	}
});
document.querySelector("#power-of-ten")?.addEventListener("click", () => {
	if (result.innerText !== "0") {
		result.innerText = `${Math.pow(10, parseFloat(result.innerText))}`;
	}
});
document.querySelector("#natural-log")?.addEventListener("click", () => {
	result.innerText = `${Math.log(parseFloat(result.innerText))}`;
	updateResultFontSize();
});
document.querySelector("#rad")?.addEventListener("click", () => {
	result.innerText = `${convertToRadians(parseFloat(result.innerText))}`;
	updateResultFontSize();
});
document.querySelector("#rand")?.addEventListener("click", () => {
	result.innerText = `${Math.random()}`;
	updateResultFontSize();
});
document.querySelector("#log10")?.addEventListener("click", () => {
	result.innerText = `${Math.log10(parseFloat(result.innerText))}`;
	updateResultFontSize();
});
document.querySelector("#sin")?.addEventListener("click", () => {
	result.innerText = `${Math.sin(parseFloat(result.innerText))}`;
	updateResultFontSize();
});
document.querySelector("#cos")?.addEventListener("click", () => {
	result.innerText = `${Math.cos(parseFloat(result.innerText))}`;
	updateResultFontSize();
});
document.querySelector("#tan")?.addEventListener("click", () => {
	result.innerText = `${Math.tan(parseFloat(result.innerText))}`;
	updateResultFontSize();
});
document.querySelector("#e")?.addEventListener("click", () => {
	result.innerText = `${Math.E}`;
	updateResultFontSize();
});
document.querySelector("#sinh")?.addEventListener("click", () => {
	result.innerText = `${Math.sinh(parseFloat(result.innerText))}`;
	updateResultFontSize();
});
document.querySelector("#cosh")?.addEventListener("click", () => {
	result.innerText = `${Math.cosh(parseFloat(result.innerText))}`;
	updateResultFontSize();
});
document.querySelector("#tanh")?.addEventListener("click", () => {
	result.innerText = `${Math.tanh(parseFloat(result.innerText))}`;
	updateResultFontSize();
});
document.querySelector("#pi")?.addEventListener("click", () => {
	result.innerText = `${Math.PI}`;
	updateResultFontSize();
});
document.querySelector("#power-of-e")?.addEventListener("click", () => {
	result.innerText = `${Math.pow(Math.E, parseFloat(result.innerText))}`;
	updateResultFontSize();
});

function convertToRadians(angleInDegrees: number) {
	return angleInDegrees * (Math.PI / 180);
}

// Changing result font size
function updateResultFontSize() {
	const text = document.getElementById("result");
	const container = document.getElementById("result-container");

	if (text && container && optionalButton) {
		let resutltext = text.innerHTML;
		console.log(resutltext.length);
		if (optionalButton.style.display === "flex") {
			if (resutltext.length > 12) {
				text.style.fontSize = "3rem";
			}
			if (resutltext.length > 18) {
				text.style.fontSize = "2rem";
			}
			if (resutltext.length > 27) {
				text.style.fontSize = "1rem";
			}
		} else {
			if (resutltext.length > 4) {
				text.style.fontSize = "2rem";
			}
			if (resutltext.length > 10) {
				text.style.fontSize = "1rem";
			}
			if (resutltext.length > 20) {
				text.style.fontSize = "0.7rem";
			}
		}
	}
}
