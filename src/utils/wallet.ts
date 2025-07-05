import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Buffer } from "buffer";

type walletType = {
  mnemonic: string;
  secret: string;
  public: string;
}


/* Coin Type

  For Solana: 501'
  For Ethureum: 60'
  For Bitcoin: 0'

*/
export const generateNewWallet = ({ coinType }: { coinType: string }): walletType => {
  const mnemonic = generateMnemonic();

  window.localStorage.setItem("mnemonic", mnemonic);

  const seed = mnemonicToSeedSync(mnemonic);

  const path = `m/44'/${coinType}'/0'/0'`;

  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();

  const walletsStr = localStorage.getItem("wallets");

  if (walletsStr) {
    const wallets: [] = JSON.parse(walletsStr);
    window.localStorage.setItem(
      "wallets",
      JSON.stringify([
        ...wallets,
        {
          secret: Buffer.from(secret).toString('hex'),
          public: publicKey,
        }
      ])
    );
  } else {
    window.localStorage.setItem(
      "wallets",
      JSON.stringify([
        {
          secret: Buffer.from(secret).toString('hex'),
          public: publicKey,
        },
      ])
    );
  }


  return {
    mnemonic,
    secret: Buffer.from(secret).toString('hex'),
    public:publicKey,
  }
};



