var mongoose = require("./db")
var Order = require("./models/order.model");

function changeStatus() {
    let node = document.getElementById("status-row");
    let selected = document.getElementById("status");
    let currentText = selected.value;
    if (currentText === "Active") {
        node.style.backgroundColor = "yellow";
        selected.style.backgroundColor = "yellow"
    } else if (currentText === "Delivered") {
        node.style.backgroundColor = "green";
        selected.style.backgroundColor = "blue"
        node.style.display = "hidden"
    } else if (currentText === "Canceled") {
        node.style.backgroundColor = "red";
        selected.style.backgroundColor = "red"
    } else {
        node.style.backgroundColor = "#d4a373";
        selected.style.backgroundColor = "#d4a373"
    };

}

function showStatus() {
    let allTableCells = document.getElementsByTagName("td")
    for (var i = 0, max = allTableCells.length; i < max; i++) {
        var node = allTableCells[i];
        var currentText = node.childNodes[0].textContent;
        if (currentText.includes("Active")) {
            node.style.backgroundColor = "yellow";
        } else if (currentText.includes("Delivered")) {
            deleteRow(node);
        }
    }
};

function deleteRow(row_value) {
    var row = row_value.parentNode;
    row.parentNode.removeChild(row)
}

function redirectOrderDetail(elem) {
    let id = elem.parentElement.parentElement.childNodes[1].textContent.trim();
    var form = document.createElement('form');
    var id_label = document.createElement("label");
    var id_input = document.createElement("input");
    id_label.setAttribute("for", "id");
    id_input.setAttribute("value", id);
    form.classList.add("form-value")
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/shipper-page/order-detail');
    document.body.appendChild(form);
    document.body.appendChild(id_label);
    document.body.appendChild(id_input);
    form.submit()
}


function getIndex() {
    let current_row_index = document.getElementById("active-row");
    console.log(current_row_index);
}


function overlayShow(elem) {
    let row_index = elem.parentElement.parentElement.rowIndex;
    let current_row = elem.parentElement.parentElement;
    let popup = document.getElementById("overlay")
    let opacity = document.getElementById("main-container")
    current_row.classList.add("active-row");
    popup.classList.add("open-popup");
    opacity.classList.add("overlay-container");

    return row_index
}

function finishedOrder() {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/shipper-page/<%= order._id %>/update');
    form.style.display = 'hidden';
    document.body.appendChild(form);
    form.submit();
}

function overlayHide() {
    let popup = document.getElementById("overlay")
    let opacity = document.getElementById("main-container")
    popup.classList.remove("open-popup");
    opacity.classList.remove("overlay-container");
}

function changeDefault(status_value) {
    document.getElementById("status").value = status_value;
}