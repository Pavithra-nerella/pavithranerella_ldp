const searchInput = document.getElementById("search-input");
const filterableDivs = document.getElementsByClassName("tablecard");

searchInput.addEventListener("input", () => {
  const searchQuery = searchInput.value.toLowerCase();

  for (let i = 0; i < filterableDivs.length; i++) {
    const divText = filterableDivs[i].textContent.toLowerCase();

    if (divText.includes(searchQuery)) {
      filterableDivs[i].style.display = "";
    } else {
      filterableDivs[i].style.display = "none";
    }
  }
});

async function getData() {
  var response = await fetch("items.json");
  var data = await response.json();
  console.log(data);

  localStorage.setItem("menu", JSON.stringify(data.menu));
  localStorage.setItem("tables", JSON.stringify(data.tables));
}

function showMenu() {
  var menu = JSON.parse(localStorage.getItem("menu"));
  console.log(menu);

  var menu_container = document.getElementById("drag-div");
  for (let i = 0; i < menu.length; i++) {
    var menu_div = document.createElement("div");
    menu_div.setAttribute("id", i + 1);
    menu_div.setAttribute("draggable", "true");
    menu_div.ondragstart = function drag(e) {
      console.log(e.target.id);
      e.dataTransfer.setData(`text`, e.target.id);
    };
    menu_div.classList.add("menu-item");
    var menu_title = document.createElement("span");
    menu_title.classList.add("menu-title");
    var menu_price = document.createElement("span");
    menu_price.classList.add("menu-price");

    menu_title.innerText = menu[i].name;
    menu_price.innerText = "Rs" + " " + menu[i].price;

    menu_div.append(menu_title, menu_price);

    menu_container.append(menu_div);
  }
}

function showTables() {
  var tables = JSON.parse(localStorage.getItem("tables"));
  console.log(tables);
}

function allowDrop(e) {
  e.preventDefault();
}

function searchMenu() {
  var menu = JSON.parse(localStorage.getItem("menu"));
  var searchValue = document.getElementById("search").value.toLowerCase();
  var menu_container = document.getElementById("drag-div");
  menu_container.innerHTML = "";
  console.log(menu_container);

  for (let i = 0; i < menu.length; i++) {
    var itemName = menu[i].name.toLowerCase();
    var itemCategory = menu[i].category.toLowerCase();

    if (itemName.includes(searchValue) || itemCategory.includes(searchValue)) {
      var menu_div = document.createElement("div");
      menu_div.setAttribute("id", i + 1);
      menu_div.setAttribute("draggable", "true");
      menu_div.ondragstart = function drag(e) {
        console.log(e.target.id);
        e.dataTransfer.setData(`text`, e.target.id);
      };
      menu_div.classList.add("menu-item");
      var menu_title = document.createElement("span");
      menu_title.classList.add("menu-title");
      var menu_price = document.createElement("span");
      menu_price.classList.add("menu-price");
      menu_title.innerText = menu[i].name;
      menu_price.innerText = menu[i].price;
      menu_div.append(menu_title, menu_price);
      menu_container.append(menu_div);
    }
  }
}

var modal1 = document.getElementById("myModalOne");
var modal2 = document.getElementById("myModalTwo");
var modal3 = document.getElementById("myModalThree");

var btn = document.getElementsByClassName("table");
console.log(btn[2]);

var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var span3 = document.getElementsByClassName("close")[2];

btn[0].onclick = function () {
  modal1.style.display = "block";
};
btn[1].onclick = function () {
  modal2.style.display = "block";
};
btn[2].onclick = function () {
  modal3.style.display = "block";
};

span1.onclick = function (event) {
  modal1.style.display = "none";
};
span2.onclick = function (event) {
  modal2.style.display = "none";
};
span3.onclick = function (event) {
  modal3.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  } else if (event.target == modal2) {
    modal2.style.display = "none";
  } else if (event.target == modal3) {
    modal3.style.display = "none";
  }
};

function drop1(ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("text");

  var table = document.getElementById("order-table");

  var menu = JSON.parse(localStorage.getItem("menu"));

  var existingRow = table.querySelector(`tr[id="${id}"]`);
  if (existingRow) {
    var cellQuantity = existingRow.querySelector(".quantity input");
    var cellPrice = existingRow.querySelector(".price");
    var newQuantity = Number(cellQuantity.value) + 1;
    cellQuantity.value = newQuantity;
    cellPrice.innerText = `${(
      newQuantity * Number(menu[id - 1].price.slice(0))
    ).toFixed(2)}`;
    updateTotal(table);
  } else {
    var row = table.insertRow(-1);
    row.setAttribute("id", id);

    var cellSerial = row.insertCell(0);
    var cellTitle = row.insertCell(1);
    var cellQuantity = row.insertCell(2);
    var cellPrice = row.insertCell(3);
    var cellDelete = row.insertCell(4);

    cellSerial.innerText = table.rows.length - 1;
    cellTitle.innerText = menu[id - 1].name;
    cellQuantity.classList.add("quantity");
    cellPrice.innerText = menu[id - 1].price;
    cellPrice.classList.add("price");

    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("min", "1");
    quantityInput.setAttribute("value", "1");
    quantityInput.classList.add("quantity");
    cellQuantity.appendChild(quantityInput);

    var initialPrice = Number(menu[id - 1].price.slice(0));
    cellPrice.innerText = initialPrice.toFixed(2);

    cellDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
    cellDelete.addEventListener("click", function () {
      var row = this.parentNode;
      var cellPrice = row.querySelector(".price");
      var price = Number(cellPrice.innerText.slice(0));
      table.deleteRow(row.rowIndex);
      updateTotal(table, price);
      updateInputBox(table);
    });

    quantityInput.addEventListener("change", function () {
      updatePrice();
      updateTotal(table);
      updateInputBox(table);
    });
  }

  updatePrice();
  updateTotal(table);
  updateInputBox(table);

  function updatePrice() {
    var quantityInput = cellQuantity.querySelector(".quantity");
    var quantity = Number(quantityInput.value);
    var price = Number(menu[id - 1].price.slice(0));
    cellPrice.innerText = `${(quantity * price).toFixed(2)}`;
  }

  function updateTotal(table, deletedPrice) {
    var totalItems = 0;
    var totalCost = 0;

    for (var i = 1; i < table.rows.length; i++) {
      var row = table.rows[i];
      var cellQuantity = row.querySelector(".quantity");
      var cellPrice = row.querySelector(".price");

      totalItems += Number(cellQuantity.querySelector("input").value);
      console.log(totalItems);
      totalCost += Number(cellPrice.innerText.slice(0));

      var cellSerial = row.cells[0];
      cellSerial.innerText = i;
    }

    if (deletedPrice) {
      totalCost = totalCost;
    }

    var totalItemsTable2 = document.getElementById("total-items-1");
    var totalCostTable2 = document.getElementById("total-cost-1");
    var totalItemsDisplay = document.getElementById("total-items1");
    totalItemsDisplay.innerText = totalItems;
    var totalCostDisplay = document.getElementById("total-cost1");
    totalCostDisplay.innerText = `${totalCost.toFixed(2)}`;
    totalItemsTable2.innerText = "Total Items: " + totalItems;
    totalCostTable2.innerText = "Total Cost: " + `${totalCost.toFixed(2)}`;
  }
}

function drop2(ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("text");

  var table = document.getElementById("order-table1");

  var menu = JSON.parse(localStorage.getItem("menu"));

  var existingRow = table.querySelector(`tr[id="${id}"]`);
  if (existingRow) {
    var cellQuantity = existingRow.querySelector(".quantity input");
    var cellPrice = existingRow.querySelector(".price");
    var newQuantity = Number(cellQuantity.value) + 1;
    cellQuantity.value = newQuantity;
    cellPrice.innerText = `${(
      newQuantity * Number(menu[id - 1].price.slice(0))
    ).toFixed(2)}`;
    updateTotal(table);
  } else {
    var row = table.insertRow(-1);
    row.setAttribute("id", id);

    var cellSerial = row.insertCell(0);
    var cellTitle = row.insertCell(1);
    var cellQuantity = row.insertCell(2);
    var cellPrice = row.insertCell(3);
    var cellDelete = row.insertCell(4);

    cellSerial.innerText = table.rows.length - 1;
    cellTitle.innerText = menu[id - 1].name;

    cellQuantity.classList.add("quantity");
    cellPrice.innerText = menu[id - 1].price;
    cellPrice.classList.add("price");

    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("min", "1");
    quantityInput.setAttribute("value", "1");
    quantityInput.classList.add("quantity");
    cellQuantity.appendChild(quantityInput);

    var initialPrice = Number(menu[id - 1].price.slice(0));
    cellPrice.innerText = initialPrice.toFixed(2);

    cellDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
    cellDelete.addEventListener("click", function () {
      var row = this.parentNode;
      var cellPrice = row.querySelector(".price");
      var price = Number(cellPrice.innerText.slice(0));
      table.deleteRow(row.rowIndex);
      updateTotal(table, price);
      updateInputBox(table);
    });

    quantityInput.addEventListener("change", function () {
      updatePrice();
      updateTotal(table);
      updateInputBox(table);
    });
  }

  updatePrice();
  updateTotal(table);
  updateInputBox(table);

  function updatePrice() {
    var quantityInput = cellQuantity.querySelector(".quantity");
    var quantity = Number(quantityInput.value);
    var price = Number(menu[id - 1].price.slice(0));
    cellPrice.innerText = `${(quantity * price).toFixed(2)}`;
  }

  function updateTotal(table, deletedPrice) {
    var totalItems = 0;
    var totalCost = 0;

    for (var i = 1; i < table.rows.length; i++) {
      var row = table.rows[i];
      var cellQuantity = row.querySelector(".quantity");
      var cellPrice = row.querySelector(".price");

      totalItems += Number(cellQuantity.querySelector("input").value);
      console.log(totalItems);
      totalCost += Number(cellPrice.innerText.slice(0));

      var cellSerial = row.cells[0];
      cellSerial.innerText = i;
    }

    if (deletedPrice) {
      totalCost = totalCost;
    }

    var totalItemsTable2 = document.getElementById("total-items-2");
    var totalCostTable2 = document.getElementById("total-cost-2");
    var totalItemsDisplay = document.getElementById("total-items2");
    totalItemsDisplay.innerText = totalItems;
    var totalCostDisplay = document.getElementById("total-cost2");
    totalCostDisplay.innerText = `${totalCost.toFixed(2)}`;
    totalItemsTable2.innerText = "Total Items: " + totalItems;
    totalCostTable2.innerText = "Total Cost: " + `${totalCost.toFixed(2)}`;
  }
}

function drop3(ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("text");

  var table = document.getElementById("order-table2");

  var menu = JSON.parse(localStorage.getItem("menu"));

  var existingRow = table.querySelector(`tr[id="${id}"]`);
  if (existingRow) {
    var cellQuantity = existingRow.querySelector(".quantity input");
    var cellPrice = existingRow.querySelector(".price");
    var newQuantity = Number(cellQuantity.value) + 1;
    cellQuantity.value = newQuantity;
    cellPrice.innerText = `${(
      newQuantity * Number(menu[id - 1].price.slice(0))
    ).toFixed(2)}`;
    updateTotal(table);
  } else {
    var row = table.insertRow(-1);
    row.setAttribute("id", id);

    var cellSerial = row.insertCell(0);
    var cellTitle = row.insertCell(1);
    var cellQuantity = row.insertCell(2);
    var cellPrice = row.insertCell(3);
    var cellDelete = row.insertCell(4);

    cellSerial.innerText = table.rows.length - 1;
    cellTitle.innerText = menu[id - 1].name;
    cellQuantity.classList.add("quantity");
    cellPrice.innerText = menu[id - 1].price;
    cellPrice.classList.add("price");

    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("min", "1");
    quantityInput.setAttribute("value", "1");
    quantityInput.classList.add("quantity");
    cellQuantity.appendChild(quantityInput);

    var initialPrice = Number(menu[id - 1].price.slice(0));
    cellPrice.innerText = initialPrice.toFixed(2);

    cellDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
    cellDelete.addEventListener("click", function () {
      var row = this.parentNode;
      var cellPrice = row.querySelector(".price");
      var price = Number(cellPrice.innerText.slice(0));
      table.deleteRow(row.rowIndex);
      updateTotal(table, price);
      updateInputBox(table);
    });

    quantityInput.addEventListener("change", function () {
      updatePrice();
      updateTotal(table);
      updateInputBox(table);
    });
  }

  updatePrice();
  updateTotal(table);
  updateInputBox(table);

  function updatePrice() {
    var quantityInput = cellQuantity.querySelector(".quantity");
    var quantity = Number(quantityInput.value);
    var price = Number(menu[id - 1].price.slice(0));
    cellPrice.innerText = `${(quantity * price).toFixed(2)}`;
  }

  function updateTotal(table, deletedPrice) {
    var totalItems = 0;
    var totalCost = 0;

    for (var i = 1; i < table.rows.length; i++) {
      var row = table.rows[i];
      var cellQuantity = row.querySelector(".quantity");
      var cellPrice = row.querySelector(".price");

      totalItems += Number(cellQuantity.querySelector("input").value);
      console.log(totalItems);
      totalCost += Number(cellPrice.innerText.slice(0));

      var cellSerial = row.cells[0];
      cellSerial.innerText = i;
    }

    if (deletedPrice) {
      totalCost = totalCost;
    }

    var totalItemsTable2 = document.getElementById("total-items-3");
    var totalCostTable2 = document.getElementById("total-cost-3");
    var totalItemsDisplay = document.getElementById("total-items3");
    totalItemsDisplay.innerText = totalItems;
    var totalCostDisplay = document.getElementById("total-cost3");
    totalCostDisplay.innerText = `${totalCost.toFixed(2)}`;
    totalItemsTable2.innerText = "Total Items:  " + totalItems;
    totalCostTable2.innerText = "Total Cost: " + `${totalCost.toFixed(2)}`;
  }
}

getData();
showMenu();
showTables();

function generateBill1() {
  var table = document.getElementById("order-table");
  var totalItems = document.getElementById("total-items1").textContent;
  var totalCost = document.getElementById("total-cost1").textContent;
  var billMessage = "Table-1\n Your Total Bill is\n";
  for (var i = 1; i < table.rows.length; i++) {
    var row = table.rows[i];
    var itemName = row.cells[1].textContent;
    var itemQuantity = row.cells[2].querySelector("input").value;
    var itemPrice = row.cells[3].textContent;
    billMessage += `Item Name:${itemName}\n Item Price: ${itemPrice}\n Item Quantity: ${itemQuantity}\n`;
  }
  billMessage += `Total Items: ${totalItems}\n`;
  billMessage += `Total Cost: ${totalCost}`;
  alert(billMessage);

  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  var totalItemsTable2 = document.getElementById("total-items-1");
  var totalCostTable2 = document.getElementById("total-cost-1");
  var totalItemsDisplay = document.getElementById("total-items1");
  var totalCostDisplay = document.getElementById("total-cost1");
  totalItemsDisplay.innerText = 0;
  totalCostDisplay.innerText = "0.00";
  totalItemsTable2.innerText = "Total Items: 0";
  totalCostTable2.innerText = "Total Cost: 0.00";
}

function generateBill2() {
  var table = document.getElementById("order-table1");
  var totalItems = document.getElementById("total-items2").textContent;
  var totalCost = document.getElementById("total-cost2").textContent;
  var billMessage = "Table-2\n Your Total Bill is\n";
  for (var i = 1; i < table.rows.length; i++) {
    var row = table.rows[i];
    var itemName = row.cells[1].textContent;
    var itemQuantity = row.cells[2].querySelector("input").value;
    var itemPrice = row.cells[3].textContent;
    billMessage += `Item Name:${itemName}\n Item Price: ${itemPrice}\n Item Quantity: ${itemQuantity}\n`;
  }
  billMessage += `Total Items: ${totalItems}\n`;
  billMessage += `Total Cost: ${totalCost}`;
  alert(billMessage);

  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  var totalItemsTable2 = document.getElementById("total-items-2");
  var totalCostTable2 = document.getElementById("total-cost-2");
  var totalItemsDisplay = document.getElementById("total-items2");
  var totalCostDisplay = document.getElementById("total-cost2");
  totalItemsDisplay.innerText = 0;
  totalCostDisplay.innerText = "0";
  totalItemsTable2.innerText = "Total Items: 0";
  totalCostTable2.innerText = "Total Cost: 0";
}

function generateBill3() {
  var table = document.getElementById("order-table2");
  var totalItems = document.getElementById("total-items3").textContent;
  var totalCost = document.getElementById("total-cost3").textContent;
  var billMessage = "Table-3\n Your Total Bill is\n";
  for (var i = 1; i < table.rows.length; i++) {
    var row = table.rows[i];
    var itemName = row.cells[1].textContent;
    var itemQuantity = row.cells[2].querySelector("input").value;
    var itemPrice = row.cells[3].textContent;
    billMessage += `Item Name:${itemName}\n Item Price: ${itemPrice}\n Item Quantity: ${itemQuantity}\n`;
  }
  billMessage += `Total Items: ${totalItems}\n`;
  billMessage += `Total Cost: ${totalCost}`;
  alert(billMessage);

  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  var totalItemsTable2 = document.getElementById("total-items-3");
  var totalCostTable2 = document.getElementById("total-cost-3");
  var totalItemsDisplay = document.getElementById("total-items3");
  var totalCostDisplay = document.getElementById("total-cost3");
  totalItemsDisplay.innerText = 0;
  totalCostDisplay.innerText = "0.00";
  totalItemsTable2.innerText = "Total Items: 0";
  totalCostTable2.innerText = "Total Cost: 0.00";
}
