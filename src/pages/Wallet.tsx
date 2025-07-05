import Header from "../components/Header";
import { generateNewWallet } from "../utils/wallet";

const Wallet = () => {
  const createNewWallet = () => {
    const wallet = generateNewWallet({ coinType: "501" });

    console.log(wallet);
  };

  return (
    <div>
      <Header />

      <div className="w-full flex items-center justify-center px-10 my-10 space-x-5">
        <input
          type="text"
          placeholder="Create a new wallet or paste the existing seed phrase"
          className="w-3/4 bg-neutral-900 px-5 py-4 rounded-2xl outline-none"
        />
        <button
          onClick={() => createNewWallet()}
          className="px-6 py-3 bg-linear-to-r from-blue-300 via-blue-400 to-blue-600 rounded-4xl font-bold text-black cursor-pointer transition hover:scale-105 text-sm"
        >
          Create new wallet
        </button>
      </div>
    </div>
  );
};

export default Wallet;
