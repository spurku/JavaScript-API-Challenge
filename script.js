// Fetch the characters from the Thrones API and display them in the table
(async () => {
    try {
        const response = await fetch("https://thronesapi.com/api/v2/characters");
        const data = await response.json(); // Parse the response as JSON

        console.log(data); // Log the data to check the structure

        const tableBody = document.getElementById("table-body");

        // Loop through the data and insert rows into the table
        data.forEach(character => {
            tableBody.innerHTML += `
                <tr onclick="rowClick(${character.id})">
                    <td>${character.id}</td>
                    <td>${character.fullName}</td>
                    <td>${character.title}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();

// Function to handle row click
function rowClick(id) {
    alert("Row clicked for character with ID: " + id);
}

// Placeholder function for searching characters (you can extend it)
function searchCharacter() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#table-body tr");

    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
