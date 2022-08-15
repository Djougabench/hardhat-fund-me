require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("@nomicfoundation/hardhat-chai-matchers")
require("dotenv").config()
//require('./tasks/block-number');
require("solidity-coverage")
require("hardhat-deploy")

const {
    INFURA,
    PRIVATE_KEY,
    ETHERSCAN_API_KEY,
    COINMARKETCAP_API_KEY
} = process.env

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        compilers: [
            { version: "0.8.8" },
            { version: "0.8.12" },
            { version: "0.6.6" }
        ],
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    paths: {
        artifacts: "./artifacts"
    },
    defaultnetwork: "hardhat",
    networks: {
        rinkeby: {
            url: INFURA,
            accounts: [`0x${PRIVATE_KEY}`],
            chainId: 4,
            blockConfirmations: 6
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS ? false : true,
        outputFile: "gas-report-txt",
        noColors: true,
        currency: "USD",
        gasPrice: 21,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH"
    },

    namedAccounts: {
        deployer: {
            default: 0
        },
        user: { default: 1 }
    }
}
