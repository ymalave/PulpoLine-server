const { Client, Hbar, TokenCreateTransaction } = require('@hashgraph/sdk');


class HederaService{
    constructor() { }

    async findAllTokens() {
       
    }

    async createToken(data){
        let client = Client.forTestnet(); // O Client.forMainnet()
        client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

        var createToken = await new TokenCreateTransaction()
                            .setTokenName(data.token_name)
                            .setTokenSymbol(data.token_symbol)
                            .setDecimals(data.decimals)
                            .setInitialSupply(10000000)
                            .setMaxTransactionFee(new Hbar(data.max_transaction))
                            .setTreasuryAccountId(process.env.MY_ACCOUNT_ID)
                            .setTransactionValidDuration(60)
                            .execute(client);

        var createRecept = await createToken.getReceipt(client);

        var newTokeId = createRecept.tokenId;
        return newTokeId;
    }
}


module.exports = HederaService;