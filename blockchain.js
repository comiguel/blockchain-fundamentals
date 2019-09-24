const SHA256 = require("crypto-js/sha256");

function calculateHash(block) {
  return SHA256(
    `${block.index}
     ${block.timestamp}
     ${block.previousHash}
     ${JSON.stringify(block.data)}
     ${block.nonce}`
  ).toString();
}

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = calculateHash(this);
  }

  mineBlock(difficulty) {
    const prefix = Array(difficulty + 1).join('0');
    while (this.hash.substring(0, difficulty) !== prefix) {
      this.nonce++;
      this.hash = calculateHash(this);
    }
    console.log(`Tomó ${this.nonce} iteraciones`);
  }
}

class Blockchain {
  constructor() {
    const genesisBlock = new Block(0, new Date().getTime(), 'Genesis Block', null);
    genesisBlock.mineBlock(5);
    this.chain = [genesisBlock];
  }

  print() {
    this.chain.forEach((block) => {console.log(`${JSON.stringify(block)}\n`)});
  }
}

const blockchain = new Blockchain();

blockchain.print();