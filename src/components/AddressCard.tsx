

const AddressCard = ({walletno, publicAddress, privateAddress}:{walletno:number, publicAddress: string; privateAddress: string}) => {
    return (
        <div>
            <p>Wallet {walletno}</p>
            <div>
            <p>Public Address: {publicAddress}</p>
            <p>Private Address: {privateAddress}</p>
            </div>
        </div>
    )
}

export default AddressCard;