document.getElementById('spinButton').addEventListener('click', spinReels);

function spinReels() {
    const symbols = ['🍒', '🍋', '🍉', '🍇', '7️⃣'];
    const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
    let results = [];

    reels.forEach(reel => {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel.textContent = symbol;
        results.push(symbol);
    });

    // Check if Telegram WebApp is initialized correctly
    if (window.Telegram.WebApp) {
        // Send data back to your bot using the sendData method
        Telegram.WebApp.sendData(`Slots result: ${results.join(' ')}`);
    }
}
