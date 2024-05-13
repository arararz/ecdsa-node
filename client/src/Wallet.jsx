import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = toHex(secp256k1.getPublicKey(evt.target.value));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Enter your private key" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
