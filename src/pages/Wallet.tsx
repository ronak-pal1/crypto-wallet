import { useEffect, useState } from "react";
import Header from "../components/Header";
import { generateNewWallet } from "../utils/wallet";
import AddressCard from "../components/AddressCard";

const SecretPhrasePopUp = ({
  show,
  setShow,
  mnemonic,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  mnemonic: string;
}) => {
  const copyAndClose = () => {
    setShow(false);

    navigator.clipboard.writeText(mnemonic);
  };

  return (
    <>
      {show && (
        <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center z-50">
          <div
            className="w-2/3 h-3/4 bg-neutral-900 rounded-3xl px-5 py-7 flex flex-col items-center justify-between cursor-pointer"
            onClick={() => copyAndClose()}
          >
            <h3 className="text-center text-3xl">Your Secret Phrase</h3>
            <div className="w-full h-full grid grid-cols-3 grid-rows-4 [&>*]:text-center flex-[0.7]">
              {mnemonic.split(" ").map((word, index) => (
                <div key={index}>
                  <span className="mr-1.5">{index + 1}.</span> {word}
                </div>
              ))}
            </div>
            <p className="text-center text-neutral-500">
              Click anywhere in the box to copy
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const Wallet = () => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [wallets, setWallets] = useState<{
    public:string;
    secret:string;
  }[]>([]);

  const [showSecret, setShowSecret] = useState<boolean>(false);

  useEffect(() => {
    const savedMnemonic = localStorage.getItem("mnemonic");
    if (savedMnemonic && !mnemonic) setMnemonic(savedMnemonic);

    const savedWallets = localStorage.getItem("wallets");

    if (savedWallets) {
      setWallets(JSON.parse(savedWallets));
    }
  }, [mnemonic]);

  const createNewWallet = () => {
    const wallet = generateNewWallet({ coinType: "501" });

    setMnemonic(wallet.mnemonic)
  };

  const addWallet = () => {};

  const deleteWallet = () => {
    localStorage.removeItem("mnemonic");
    localStorage.removeItem("wallets");

    setMnemonic("");
    setWallets([])
  };

  return (
    <div>
      <SecretPhrasePopUp
        show={showSecret}
        setShow={setShowSecret}
        mnemonic={mnemonic}
      />
      <Header />

      <div className="w-full flex items-center justify-center px-10 my-10 space-x-5">
        {mnemonic ? (
          <>
            <button
              onClick={() => createNewWallet()}
              className="px-6 py-2 bg-green-400 rounded-4xl font-bold text-black cursor-pointer transition hover:scale-105 text-sm"
            >
              Add wallet
            </button>

            <button
              onClick={() => {
                setShowSecret(true);
              }}
              className="px-6 py-2 bg-blue-300 rounded-4xl font-bold text-black cursor-pointer transition hover:scale-105 text-sm"
            >
              View secret
            </button>

            <button
              onClick={() => deleteWallet()}
              className="px-6 py-2 bg-red-500 rounded-4xl font-bold text-black cursor-pointer transition hover:scale-105 text-sm"
            >
              Delete wallet
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div className="w-full px-10 space-y-3.5">
        <p className="text-3xl">Wallets</p>
        <div className="w-full flex items-center  space-y-7">

            {
                wallets.map((wallet,index) => (
                    <AddressCard key={index} walletno={index+1} publicAddress={wallet.public} privateAddress={wallet.secret}/>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default Wallet;
