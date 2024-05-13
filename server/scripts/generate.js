const { secp256k1 } = require("ethereum-cryptography/secp256k1.js")
const { toHex } = require("ethereum-cryptography/utils")

const privateKey = secp256k1.utils.randomPrivateKey()

console.log(toHex(privateKey))

const publicKey = secp256k1.getPublicKey(privateKey)

console.log(toHex(publicKey))