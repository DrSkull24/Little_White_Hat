window.onload = function() {
    let startButton = document.getElementById("startButton");
    startButton.style.position = 'absolute';
    alert(startButton.width + ' ' + startButton.style.height);
    startButton.style.top = window.innerHeight/2 - startButton.style.height + 'px';
    startButton.style.left = window.innerWidth/2 - startButton.style.width + 'px';
    alert(startButton.style.top + ' ' + startButton.style.left);
};