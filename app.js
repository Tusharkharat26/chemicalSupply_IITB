let data = [
  // Sample data
  {
    id: 1,
    name: "Ammonium Persulfate",
    vendor: "LG Chem",
    density: 3525.92,
    viscosity: 60.63,
    packaging: "Bag",
    packSize: "100.00",
    unit: "kg",
    quantity: 6495.18,
  },
  {
    id: 2,
    name: "Caustic Potash",
    vendor: "Formosa",
    density: 3172.15,
    viscosity: 48.22,
    packaging: "Bag",
    packSize: "100.00",
    unit: "kg",
    quantity: 8751.99,
  },
];

let selectedRow = null;

// Load table data
function loadTableData() {
  const tableBody = document.querySelector("#chemicalTable tbody");
  tableBody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="checkbox${index}">
                </div>
            </td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.vendor}</td>
            <td>${item.density}</td>
            <td>${item.viscosity}</td>
            <td>${item.packaging}</td>
            <td>${item.packSize}</td>
            <td>${item.unit}</td>
            <td>${item.quantity}</td>
            <td><button class="btn btn-sm btn-warning" onclick="editRow(${index})">✏️</button></td>
        `;
    row.addEventListener("click", () => selectRow(index));
    tableBody.appendChild(row);
  });
}

// Select row
function selectRow(index) {
  const rows = document.querySelectorAll("#chemicalTable tbody tr");
  rows.forEach((row) => row.classList.remove("selected"));
  rows[index].classList.add("selected");
  selectedRow = index;
}

// Sort the table
function sortTable(colIndex) {
  data.sort((a, b) => {
    let valA = Object.values(a)[colIndex];
    let valB = Object.values(b)[colIndex];
    return valA > valB ? 1 : -1;
  });
  loadTableData();
}

// Edit a row
function editRow(index) {
  const row = data[index];
  const tableRow = document.querySelectorAll("#chemicalTable tbody tr")[index];

  tableRow.innerHTML = `
    <td>
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="checkbox${index}">
        </div>
    </td>
    <td>${row.id}</td>
    <td><input type="text" class="form-control" value="${row.name}" /></td>
    <td><input type="text" class="form-control" value="${row.vendor}" /></td>
    <td><input type="number" class="form-control" value="${row.density}" /></td>
    <td><input type="number" class="form-control" value="${row.viscosity}" /></td>
    <td><input type="text" class="form-control" value="${row.packaging}" /></td>
    <td><input type="text" class="form-control" value="${row.packSize}" /></td>
    <td><input type="text" class="form-control" value="${row.unit}" /></td>
    <td><input type="number" class="form-control" value="${row.quantity}" /></td>
    <td><button class="btn btn-sm btn-success" onclick="saveEdit(${index})">💾 Save</button></td>
  `;
}

// Save the edited row
function saveEdit(index) {
  const tableRow = document.querySelectorAll("#chemicalTable tbody tr")[index];
  const inputs = tableRow.querySelectorAll("input");

  // Update data array with new values
  data[index] = {
    id: data[index].id,
    name: inputs[1].value,
    vendor: inputs[2].value,
    density: parseFloat(inputs[3].value),
    viscosity: parseFloat(inputs[4].value),
    packaging: inputs[5].value,
    packSize: inputs[6].value,
    unit: inputs[7].value,
    quantity: parseFloat(inputs[8].value),
  };

  // Reload table after saving
  loadTableData();
}

// Add a new row
document.getElementById("addRowBtn").addEventListener("click", () => {
  const newRow = {
    id: data.length + 1,
    name: "New Chemical",
    vendor: "New Vendor",
    density: 0,
    viscosity: 0,
    packaging: "New",
    packSize: "0",
    unit: "kg",
    quantity: 0,
  };
  data.push(newRow);
  loadTableData();
});

// Delete the selected row
document.getElementById("deleteRowBtn").addEventListener("click", () => {
  if (selectedRow !== null) {
    data.splice(selectedRow, 1);
    selectedRow = null;
    loadTableData();
  }
});

// Move row up
document.getElementById("moveUpBtn").addEventListener("click", () => {
  if (selectedRow !== null && selectedRow > 0) {
    [data[selectedRow], data[selectedRow - 1]] = [
      data[selectedRow - 1],
      data[selectedRow],
    ];
    selectedRow--;
    loadTableData();
  }
});

// Move row down
document.getElementById("moveDownBtn").addEventListener("click", () => {
  if (selectedRow !== null && selectedRow < data.length - 1) {
    [data[selectedRow], data[selectedRow + 1]] = [
      data[selectedRow + 1],
      data[selectedRow],
    ];
    selectedRow++;
    loadTableData();
  }
});

// Refresh data
document.getElementById("refreshBtn").addEventListener("click", loadTableData);

// Save data (Mock function)
document.getElementById("saveBtn").addEventListener("click", () => {
  console.log("Data saved:", JSON.stringify(data, null, 2));
});

// Initial table load
window.onload = loadTableData;
