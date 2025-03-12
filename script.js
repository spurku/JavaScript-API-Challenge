// Fetch characters and populate the table
(async () => {
    try {
        const response = await fetch("https://thronesapi.com/api/v2/characters");
        const data = await response.json(); // Parse JSON response

        const tableBody = document.getElementById("table-body");

        // Loop through characters and insert them into the table
        data.forEach(character => {
            tableBody.innerHTML += `
                <tr onclick="showCharacterDetail(${character.id})" style="cursor: pointer;">
                    <td>${character.id}</td>
                    <td>${character.fullName}</td>
                    <td><img src="${character.imageUrl}" width="50" class="rounded"></td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();

// Function to show character details in modal
function showCharacterDetail(id) {
    fetch("https://thronesapi.com/api/v2/characters")
        .then(response => response.json())
        .then(data => {
            const character = data.find(char => char.id === id);
            if (character) {
                document.getElementById("characterImage").src = character.imageUrl;
                document.getElementById("characterName").textContent = character.fullName;
                document.getElementById("characterTitle").textContent = character.title;
                document.getElementById("characterFamily").textContent = character.family;
                document.getElementById("characterImageUrl").href = character.imageUrl;

                // Show the Bootstrap modal
                let characterModal = new bootstrap.Modal(document.getElementById("characterModal"));
                characterModal.show();
            }
        })
        .catch(error => console.error("Error fetching character details:", error));
}
