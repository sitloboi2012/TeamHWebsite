function checkStatus() {
    let allTableCells = document.getElementsByTagName("td")
    for (var i = 0, max = allTableCells.length; i < max; i ++) {
        let node = allTableCells[i];
        let currentText = node.childNodes[0].nodeValue;
        if (currentText === "Pending") {
            node.style.backgroundColor = "blue";
        } else if (currentText === "On Delivery") {
            node.style.backgroundColor = "yellow";
        }  else if (currentText === "Finished") {
            node.style.backgroundColor = "green";
        } else if (currentText === "Cancel Order") {
            node.style.backgroundColor = "red";
        };
    }
}