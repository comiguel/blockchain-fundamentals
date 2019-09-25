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
    this.difficulty = 4;
    const genesisBlock = new Block(0, new Date().getTime(), 'Genesis Block', null);
    genesisBlock.mineBlock(this.difficulty);
    this.chain = [genesisBlock];
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createBlock(data) {
    const lastBlock = this.getLastBlock();
    const newBlock = new Block(
      lastBlock.index + 1,
      new Date().getTime(),
      data,
      lastBlock.hash
    );
    newBlock.mineBlock(this.difficulty);
    this.addNewBlockToChain(newBlock);
  }

  addNewBlockToChain(newBlock) {
    const lastBlock = this.getLastBlock();
    if (lastBlock.index + 1 !== newBlock.index) {
      console.log('Indice no válido');
    } else if (newBlock.previousHash !== lastBlock.hash) {
      console.log('Hash anterior no coincide');
    } else if (newBlock.hash !== calculateHash(newBlock)) {
      console.log('No se hizo la minería, bloque corrupto');
    } else {
      this.chain.push(newBlock);
    }
  }

  print() {
    this.chain.forEach((block) => {console.log(`${JSON.stringify(block)}\n`)});
  }
}

const blockchain = new Blockchain();

blockchain.createBlock({from: 'Juan', to: 'Camilo', amount: 10});

blockchain.print();