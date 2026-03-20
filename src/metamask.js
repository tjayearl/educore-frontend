export async function connectMetaMask() {
  if (!window.ethereum) {
    console.warn("MetaMask not found");
    return null; // stop error
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected:", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error("MetaMask error:", error.message);
    return null;
  }
}