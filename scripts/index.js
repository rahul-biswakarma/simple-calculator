"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
let windowDiv = document.getElementById("window-div");
let resultDiv = document.getElementById("result");
let optionalButton = document.getElementById("optional-buttons");
let maximizeButton = document.getElementById("maximize-button");
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("calculatorPosition")) {
        let prevPosition = JSON.parse(localStorage.getItem("calculatorPosition"));
        if (windowDiv) {
            windowDiv.style.top = prevPosition.y + "px";
            windowDiv.style.left = prevPosition.x + "px";
        }
    }
    if (localStorage.getItem("calculatorMaximized") === "true") {
        if (optionalButton)
            optionalButton.style.display = "flex";
    }
    else {
        if (optionalButton)
            optionalButton.style.display = "none";
    }
    if (resultDiv)
        resultDiv.addEventListener("mousedown", dragMouseDown);
    if (maximizeButton)
        maximizeButton.addEventListener("click", handleMaximizeButtonClick);
});
var initialX = 0, initialY = 0, finalX = 0, finalY = 0;
function dragMouseDown(e) {
    e.preventDefault();
    finalX = e.clientX;
    finalY = e.clientY;
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleDrag);
}
function handleDrag(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = finalX - e.clientX;
    initialY = finalY - e.clientY;
    finalX = e.clientX;
    finalY = e.clientY;
    if (windowDiv) {
        let y = windowDiv.offsetTop - initialY;
        let x = windowDiv.offsetLeft - initialX;
        if (x < 0)
            x = 0;
        if (y < 0)
            y = 0;
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
        }
        else {
            optionalButton.style.display = "none";
            localStorage.setItem("calculatorMaximized", "false");
        }
    }
}
// Calculator.ts
function factorial(num) {
    let factorial = 1;
    for (let i = 1; i <= num; i++) {
        factorial = factorial * i;
    }
    return factorial;
}
const calculate = (operand, operator, result) => {
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
var operatorPressed = false;
var operatorLastClicked = false;
var currentOperator;
var operand1;
var operand2;
const buttons = document.querySelector("#buttons");
const result = document.querySelector("#result");
buttons === null || buttons === void 0 ? void 0 : buttons.addEventListener("click", (event) => {
    let btn = event.target;
    if (btn.classList.contains("number")) {
        if (operatorLastClicked) {
            operatorLastClicked = false;
            result.innerText = btn.innerText;
        }
        else if (result.innerText !== "0") {
            if (btn.innerText === ".") {
                if (!result.innerText.includes("."))
                    result.innerText = result.innerText.concat(btn.innerText);
            }
            else {
                result.innerText = result.innerText.concat(btn.innerText);
            }
        }
        else {
            result.innerText = btn.innerText;
        }
        updateResultFontSize();
    }
    if (btn.classList.contains("operator")) {
        if (btn.innerText === "%" && result.innerText !== "0") {
            result.innerText = "" + parseFloat(result.innerText) / 100;
            operand1 = parseFloat(result.innerText);
        }
        else if (!operatorPressed) {
            operand1 = parseFloat(result.innerText);
            operatorPressed = true;
            currentOperator = btn.innerText;
        }
        else {
            operand1 = parseFloat(calculate(`${operand1}`, currentOperator, result.innerText));
            result.innerText = "" + operand1;
            currentOperator = btn.innerText;
            operand1 = +result.innerText;
        }
        operatorLastClicked = true;
        updateResultFontSize();
    }
    if (btn.classList.contains("equals")) {
        if (operatorPressed && !operatorLastClicked) {
            operand1 = parseFloat(calculate(`${operand1}`, currentOperator, result.innerText));
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
(_a = document.querySelector("#square")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${parseFloat(result.innerText) * parseFloat(result.innerText)}`;
        updateResultFontSize();
    }
});
(_b = document.querySelector("#cube")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${parseFloat(result.innerText) *
            parseFloat(result.innerText) *
            parseFloat(result.innerText)}`;
        updateResultFontSize();
    }
});
(_c = document.querySelector("#square-root")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${Math.sqrt(parseFloat(result.innerText))}`;
        updateResultFontSize();
    }
});
(_d = document.querySelector("#cube-root")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${Math.cbrt(parseFloat(result.innerText))}`;
        updateResultFontSize();
    }
});
(_e = document.querySelector("#quardic-root")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${Math.pow(parseFloat(result.innerText), 1 / 4)}`;
        updateResultFontSize();
    }
});
(_f = document.querySelector("#reciprocal")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${1 / parseFloat(result.innerText)}`;
        updateResultFontSize();
    }
});
(_g = document.querySelector("#factorial")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${factorial(parseFloat(result.innerText))}`;
        updateResultFontSize();
    }
});
(_h = document.querySelector("#power-of-ten")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => {
    if (result.innerText !== "0") {
        result.innerText = `${Math.pow(10, parseFloat(result.innerText))}`;
    }
});
(_j = document.querySelector("#natural-log")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", () => {
    result.innerText = `${Math.log(parseFloat(result.innerText))}`;
    updateResultFontSize();
});
(_k = document.querySelector("#rad")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", () => {
    result.innerText = `${convertToRadians(parseFloat(result.innerText))}`;
    updateResultFontSize();
});
(_l = document.querySelector("#rand")) === null || _l === void 0 ? void 0 : _l.addEventListener("click", () => {
    result.innerText = `${Math.random()}`;
    updateResultFontSize();
});
(_m = document.querySelector("#log10")) === null || _m === void 0 ? void 0 : _m.addEventListener("click", () => {
    result.innerText = `${Math.log10(parseFloat(result.innerText))}`;
    updateResultFontSize();
});
(_o = document.querySelector("#sin")) === null || _o === void 0 ? void 0 : _o.addEventListener("click", () => {
    result.innerText = `${Math.sin(parseFloat(result.innerText))}`;
    updateResultFontSize();
});
(_p = document.querySelector("#cos")) === null || _p === void 0 ? void 0 : _p.addEventListener("click", () => {
    result.innerText = `${Math.cos(parseFloat(result.innerText))}`;
    updateResultFontSize();
});
(_q = document.querySelector("#tan")) === null || _q === void 0 ? void 0 : _q.addEventListener("click", () => {
    result.innerText = `${Math.tan(parseFloat(result.innerText))}`;
    updateResultFontSize();
});
(_r = document.querySelector("#e")) === null || _r === void 0 ? void 0 : _r.addEventListener("click", () => {
    result.innerText = `${Math.E}`;
    updateResultFontSize();
});
(_s = document.querySelector("#sinh")) === null || _s === void 0 ? void 0 : _s.addEventListener("click", () => {
    result.innerText = `${Math.sinh(parseFloat(result.innerText))}`;
    updateResultFontSize();
});
(_t = document.querySelector("#cosh")) === null || _t === void 0 ? void 0 : _t.addEventListener("click", () => {
    result.innerText = `${Math.cosh(parseFloat(result.innerText))}`;
    updateResultFontSize();
});
(_u = document.querySelector("#tanh")) === null || _u === void 0 ? void 0 : _u.addEventListener("click", () => {
    result.innerText = `${Math.tanh(parseFloat(result.innerText))}`;
    updateResultFontSize();
});
(_v = document.querySelector("#pi")) === null || _v === void 0 ? void 0 : _v.addEventListener("click", () => {
    result.innerText = `${Math.PI}`;
    updateResultFontSize();
});
(_w = document.querySelector("#power-of-e")) === null || _w === void 0 ? void 0 : _w.addEventListener("click", () => {
    result.innerText = `${Math.pow(Math.E, parseFloat(result.innerText))}`;
    updateResultFontSize();
});
function convertToRadians(angleInDegrees) {
    return angleInDegrees * (Math.PI / 180);
}
// Changing result font size
function updateResultFontSize() {
    const text = document.getElementById("result");
    const container = document.getElementById("result-container");
    if (text && container && optionalButton) {
        let resutltext = text.innerHTML;
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
        }
        else {
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
