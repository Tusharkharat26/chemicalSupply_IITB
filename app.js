let data = [
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
  {
    id: 3,
    name: "Dimethylaminopropylamino",
    vendor: "LG Chem",
    density: 8433.37,
    viscosity: 12.62,
    packaging: "Barrel",
    packSize: "75.00",
    unit: "L",
    quantity: 5964.61,
  },
  {
    id: 4,
    name: "Mono Ammonium Phosphate",
    vendor: "Sinopec",
    density: 1597.65,
    viscosity: 76.51,
    packaging: "Bag",
    packSize: "105.00",
    unit: "kg",
    quantity: 8183.73,
  },
  {
    id: 5,
    name: "Ferric Nitrate",
    vendor: "DowPont",
    density: 364.64,
    viscosity: 14.39,
    packaging: "Bag",
    packSize: "105.00",
    unit: "kg",
    quantity: 4154.33,
  },
  {
    id: 6,
    name: "n-Pentane",
    vendor: "Sinopec",
    density: 4535.26,
    viscosity: 66.76,
    packaging: "N/A",
    packSize: "N/A",
    unit: "L",
    quantity: 6272.34,
  },
  {
    id: 7,
    name: "Glycol Ether PM",
    vendor: "LG Chem",
    density: 6495.18,
    viscosity: 72.12,
    packaging: "Bag",
    packSize: "250.00",
    unit: "kg",
    quantity: 8749.54,
  },
  {
    id: 8,
    name: "Sodium Carbonate",
    vendor: "BASF",
    density: 2952.16,
    viscosity: 32.54,
    packaging: "Bag",
    packSize: "90.00",
    unit: "kg",
    quantity: 4563.12,
  },
  {
    id: 9,
    name: "Hydrogen Peroxide",
    vendor: "Dow Chemical",
    density: 1472.89,
    viscosity: 6.78,
    packaging: "Barrel",
    packSize: "50.00",
    unit: "L",
    quantity: 7283.95,
  },
  {
    id: 10,
    name: "Ethylene Glycol",
    vendor: "SABIC",
    density: 1092.54,
    viscosity: 20.56,
    packaging: "Bottle",
    packSize: "25.00",
    unit: "L",
    quantity: 3472.65,
  },
  {
    id: 11,
    name: "Sulfuric Acid",
    vendor: "Formosa",
    density: 4533.12,
    viscosity: 99.12,
    packaging: "Barrel",
    packSize: "100.00",
    unit: "kg",
    quantity: 5642.12,
  },
  {
    id: 12,
    name: "Phosphoric Acid",
    vendor: "DowPont",
    density: 3221.55,
    viscosity: 45.12,
    packaging: "Bag",
    packSize: "75.00",
    unit: "kg",
    quantity: 5432.98,
  },
  {
    id: 13,
    name: "Chlorine",
    vendor: "LG Chem",
    density: 1500.25,
    viscosity: 9.34,
    packaging: "Cylinder",
    packSize: "50.00",
    unit: "L",
    quantity: 6321.43,
  },
  {
    id: 14,
    name: "Methanol",
    vendor: "SABIC",
    density: 1894.67,
    viscosity: 12.76,
    packaging: "Drum",
    packSize: "200.00",
    unit: "L",
    quantity: 7124.76,
  },
  {
    id: 15,
    name: "Benzene",
    vendor: "Formosa",
    density: 2375.12,
    viscosity: 55.31,
    packaging: "Barrel",
    packSize: "75.00",
    unit: "L",
    quantity: 3152.98,
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
                    <input type="checkbox" class="form-check-input" id="checkbox${index}" onclick="handleCheckbox(${index})">
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

// Handle checkbox behavior
function handleCheckbox(index) {
  const checkboxes = document.querySelectorAll(
    "#chemicalTable tbody .form-check-input"
  );
  checkboxes.forEach((checkbox, i) => {
    if (i !== index) {
      checkbox.checked = false; // Uncheck all other checkboxes
    }
  });
  selectedRow = index;
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
let editingRow = null;

function editRow(index) {
  // Close the previous row if it's being edited
  if (editingRow !== null && editingRow !== index) {
    saveEdit(editingRow); // Automatically save the previous row being edited
  }

  editingRow = index; // Set the new editing row
  const row = data[index];
  const tableRow = document.querySelectorAll("#chemicalTable tbody tr")[index];

  tableRow.innerHTML = `
    <td>
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="checkbox${index}" onclick="handleCheckbox(${index})">
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

  // Reset the editingRow variable
  editingRow = null;

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

// Save data
document.getElementById("saveBtn").addEventListener("click", () => {
  console.log("Data saved:", JSON.stringify(data, null, 2));
});

// Initial table load
window.onload = loadTableData;
