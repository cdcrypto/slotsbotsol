document.getElementById('spinButton').addEventListener('click', async () => {
    const backendUrl = 'https://77nypb.buildship.run/spin'; // Replace YOUR_BACKEND_URL with your actual backend URL

    // Ensure the Telegram WebApp API is initialized and user data is accessible
    if (window.Telegram.WebApp.initDataUnsafe) {
        const telegramUserId = Telegram.WebApp.initDataUnsafe.user.id;

        try {
            // Sending a POST request to the backend including the Telegram user's ID
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers your backend requires
                },
                body: JSON.stringify({
                    // Include the Telegram user's ID with your backend's required data
                    telegramUserId: telegramUserId,
                    // Add any other data your backend needs for the spin
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Update the frontend with the spin result
            const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
            result.result.forEach((symbol, index) => {
                reels[index].textContent = symbol; // Update each reel with the symbol from the backend
            });

            // Optionally, use Telegram's WebApp API to communicate back with your bot
            if (window.Telegram.WebApp) {
                Telegram.WebApp.sendData(`Spin result: ${result.message}`);
            }

        } catch (error) {
            console.error('Error:', error);
            document.getElementById('resultDisplay').textContent = 'Failed to spin. Please try again.';
        }
    } else {
        console.error('Telegram WebApp API is not initialized or user data is not accessible.');
        document.getElementById('resultDisplay').textContent = 'Failed to access Telegram user data. Please try again.';
    }
});

