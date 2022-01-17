// function buildHtmlTable(myList) {
//   var columns = addAllColumnHeaders(myList);

//   for (var i = 0; i < myList.length; i++) {
//     var row$ = $("<tr/>");
//     for (var colIndex = 0; colIndex < columns.length; colIndex++) {
//       var cellValue = myList[i][columns[colIndex]];

//       if (cellValue == null) {
//         cellValue = "";
//       }

//       row$.append($("<td/>").html(cellValue));
//     }
//     $("#excelDataTable").append(row$);
//   }
// }

// // Adds a header row to the table and returns the set of columns.
// // Need to do union of keys from all records as some records may not contain
// // all records
// function addAllColumnHeaders(myList) {
//   var columnSet = [];
//   var headerTr$ = $("<tr/>");

//   for (var i = 0; i < myList.length; i++) {
//     var rowHash = myList[i];
//     for (var key in rowHash) {
//       if ($.inArray(key, columnSet) == -1) {
//         columnSet.push(key);
//         headerTr$.append($("<th/>").html(key));
//       }
//     }
//   }
//   $("#excelDataTable").append(headerTr$);

//   return columnSet;
// }

function CreateTableFromJSON(list) {
// EXTRACT VALUE FOR HTML HEADER.
let col = [];
for (let i = 0; i < list.length; i++) {
    for (let key in list[i]) {
        if (col.indexOf(key) === -1) {
            col.push(key);
        }
    }
}

// CREATE DYNAMIC TABLE.
const table = document.createElement("table");

// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

let tr = table.insertRow(-1);                   // TABLE ROW.

for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");      // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
}

// ADD JSON DATA TO THE TABLE AS ROWS.
for (let i = 0; i < list.length; i++) {

    tr = table.insertRow(-1);

    for (let j = 0; j < col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = list[i][col[j]];
    }
}

// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
var divContainer = document.getElementById("showData");
divContainer.innerHTML = "";
divContainer.appendChild(table);
}