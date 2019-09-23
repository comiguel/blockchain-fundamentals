const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      `${this.index}
       ${this.timestamp}
       ${this.previousHash}
       ${JSON.stringify(this.data)}
       ${this.nonce}`
    ).toString();
  }
}

class Blockchain {
  constructor() {
    const genesisBlock = new Block(0, new Date().getTime(), 'Genesis Block', null);
    this.chain = [genesisBlock];
  }

  print() {
    this.chain.forEach((block) => {console.log(`${JSON.stringify(block)}\n`)});
  }
}

const blockchain = new Blockchain();

blockchain.print();