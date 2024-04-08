
<template>
  <div :class="containerClasses">
    <div class="flex justify-center pt-6">
      <img src="https://placehold.co/128" alt="QR Code" :class="qrCodeClasses">
    </div>
    <div :class="contentClasses">
      <div class="flex justify-between items-center mt-4">
        <span>{{ walletInfoText }}</span>
        <button @click="copyToClipboard" :class="copyButtonClasses">Copy</button>
      </div>
      <div class="flex flex-col items-center space-y-4 mt-4">
        <p class="font-bold">{{ walletBalanceText }}</p>
        <p class="font-bold">{{ pendingPayoutText }}</p>
      </div>
      <p class="mt-2 text-center text-sm">Welcome To SolPonzi. How does it work? Load your wallet with any amount of Solana. Enter the amount of Solana you want to double and click "Double My Sol". Once there are sufficient funds from the next person, double the amount of Solana will be sent to your wallet and you will be able to withdrawal.</p>
      <div class="mt-4">
        <input type="number" placeholder="Enter number of coins" :class="inputClasses">
      </div>
      <div class="flex justify-center mt-6">
        <button :class="submitButtonClasses">Double my Sol</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'WalletInfo',

  setup() {
    const walletAddress = ref('Account 68 (Loading...)');
    const walletBalance = ref('$100');
    const pendingPayout = ref('$50');

    const fetchWalletInfo = () => {
      // Ensure Telegram.WebApp is initialized and available
      if (window.Telegram && window.Telegram.WebApp) {
        // Obtain the user's Telegram ID
        const telegramId = Telegram.WebApp.initDataUnsafe.user.id;

        fetch('https://77nypb.buildship.run/id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telegramId: telegramId }), // Sending the Telegram ID in the request body
        })
        .then(response => response.json())
        .then(data => {
          // Update the Vue ref values based on the response
          walletAddress.value = `Account ${data.walletAddress}`; // Adjust according to your API response
          walletBalance.value = `Wallet Balance: $${data.balance}`;
          pendingPayout.value = `Pending Payout: $${data.payout}`;
        })
        .catch(error => console.error('Error fetching wallet data:', error));
      } else {
        console.error('Telegram WebApp SDK not initialized or available.');
      }
    };

    onMounted(() => {
      fetchWalletInfo();
    });

    const copyToClipboard = () => {
      navigator.clipboard.writeText(walletAddress.value).then(() => {
        alert('Wallet address copied to clipboard');
      }, (err) => {
        console.error('Could not copy text: ', err);
      });
    };

    // Shared Tailwind CSS classes
    const containerClasses = 'max-w-lg mx-auto bg-zinc-900 text-white rounded-lg shadow-lg overflow-hidden';
    const qrCodeClasses = 'p-2 bg-white border-2 border-zinc-700 rounded-lg';
    const contentClasses = 'px-6 py-4';
    const copyButtonClasses = 'px-2 py-1 text-xs font-semibold bg-zinc-700 rounded hover:bg-zinc-600';
    const inputClasses = 'w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50';
    const submitButtonClasses = 'px-6 py-3 bg-blue-500 rounded hover:bg-blue-600 text-lg font-bold';

    return {
      walletAddress,
      walletBalance,
      pendingPayout,
      copyToClipboard,
      containerClasses,
      qrCodeClasses,
      contentClasses,
      copyButtonClasses,
      inputClasses,
      submitButtonClasses,
      walletInfoText: () => walletAddress.value,
      walletBalanceText: () => walletBalance.value,
      pendingPayoutText: () => pendingPayout.value,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>


