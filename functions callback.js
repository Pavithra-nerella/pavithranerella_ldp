sum(10, 20, displayConsole);

function sum(x, y, callBack) {
  let result = x + y;
  callBack(result);
}

function displayConsole(output) {
  console.log(output);
}
