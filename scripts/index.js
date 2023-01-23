"use strict";
let windowDiv = document.getElementById("window-div");
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
    if (windowDiv)
        windowDiv.addEventListener("mousedown", dragMouseDown);
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
