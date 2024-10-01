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
  // ... populate remaining 12 rows similarly
];

let selectedRow = null;

// Load table data
function loadTableData() {
  const tableBody = document.querySelector("#chemicalTable tbody");
  tableBody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.vendor}</td>
            <td>${item.density}</td>
            <td>${item.viscosity}</td>
            <td>${item.packaging}</td>
            <td>${item.packSize}</td>
            <td>${item.unit}</td>
            <td>${item.quantity}</td>
        `;
    row.addEventListener("click", () => selectRow(index));
    tableBody.appendChild(row);
  });
}

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

window.onload = loadTableData;
