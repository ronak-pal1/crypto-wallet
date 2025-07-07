


export const getBalance = async ({publicAddress}:{publicAddress:string}) => {


    const response = await fetch("https://solana-mainnet.g.alchemy.com/v2/OASVdQAhgciSwz-CzxYr6", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"id": 1, "jsonrpc": "2.0",  "method": "getBalance",
        "params": [publicAddress]})
    })


    const data = await response.json()


}