document.addEventListener('DOMContentLoaded', () => {
    const playerInfoSection = document.getElementById('playerInfo');

    // Function to fetch player information
    const fetchData = (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    };

    // Function to display player information on the webpage
    const displayPlayerInfo = async () => {
        try {
            const apiUrl = 'https://api.chess.com/pub/player/erik'; // Replace 'erik' with the desired player's username

            const data = await fetchData(apiUrl);

            if (data) {
                const playerDetails = document.createElement('div');
                playerDetails.classList.add('player-details');

                // Display relevant information about the player
                playerDetails.innerHTML = `<p>Username: ${data.username}</p>
                                           <p>Member Since: ${data.joined}</p>
                                           <p>Country: ${data.country}</p>`;

                playerInfoSection.appendChild(playerDetails);
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Player information not available';
                playerInfoSection.appendChild(errorMessage);
            }
        } catch (error) {
            console.error('Error fetching or displaying data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to fetch player information';
            playerInfoSection.appendChild(errorMessage);
        }
    };

    // Call the function to display player information
    displayPlayerInfo();
});
