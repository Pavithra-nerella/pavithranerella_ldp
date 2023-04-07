document.getElementById("localScore").onclick = function () {
  if (localStorage.getItem("localScore") === null) {
    localStorage.setItem("localScore", "0");
  }
  var value = parseInt(localStorage.getItem("localScore"));
  var newValue = value + 1;
  localStorage.setItem("localScore", newValue);
  document.getElementById("Local count").innerHTML = newValue;
};

document.getElementById("sessionScore").onclick = function () {
  if (sessionStorage.getItem("sessionScore") === null) {
    sessionStorage.setItem("sessionScore", "0");
  }
  var value = parseInt(sessionStorage.getItem("sessionScore"));
  var newValue = value + 1;
  sessionStorage.setItem("sessionScore", newValue);
  document.getElementById("Session count").innerHTML = newValue;
};

document.getElementById("resetBtn").onclick = function () {
  sessionStorage.setItem("sessionScore", "0");
  document.getElementById("Session count").innerHTML = "0";
};
