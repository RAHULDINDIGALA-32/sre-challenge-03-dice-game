# 🎲 SRE Challenge 03 — Dice Game (Predictable Randomness Exploit)

A full-stack Web3 project built as part of **SpeedRunEthereum Challenge 03**.

This challenge demonstrates why **public deterministic blockchains cannot generate secure randomness**.  
The original `DiceGame.sol` contract uses `blockhash` to compute random rolls — which attackers can predict.

To beat the game every time, we deploy a dedicated `RiggedRoll.sol` contract that:

- Calculates the upcoming dice roll *before calling the game*
- Only plays when the roll is guaranteed to win
- Drains the prize pool using deterministic chain data
- Demonstrates a real-world smart contract exploit pattern

This is a hands-on demonstration of **blockhash random number vulnerabilities** and how attackers exploit them in production contracts.

---

## 🚀 Live Demo

**Frontend (Vercel):** https://sre-challenge-03-dice-game-nextjs.vercel.app/

**DiceGame Contract (Sepolia):** `0xF3AE4CC418223e902dAF667b462d38856b08F1E3`  

**RiggedRoll Contract (Attacker) (Sepolia):** `0x7F96792aad28d8c432D3e7b1C3C52e3d6ED5DD9b`  

**Block Explorer:** https://sepolia.etherscan.io/address/0x7F96792aad28d8c432D3e7b1C3C52e3d6ED5DD9b

---

## 🧱 Tech Stack

### 🖥 Smart Contracts
- Solidity (v0.8.x)
- Hardhat
- Sepolia Testnet
- `DiceGame.sol` (vulnerable randomness)
- `RiggedRoll.sol` (exploits blockhash predictability)

### 🎨 Frontend (Scaffold-ETH 2)
- Next.js 13 (App Router)
- React
- TypeScript
- TailwindCSS
- Wagmi + Viem
- RainbowKit
- Scaffold-ETH 2 Debug Components
- Deployment on Vercel

---

## 🎯 Features

### 🔹 DiceGame Contract
Implements a simple on-chain dice roll game:

- Users pay **0.002 ETH** per roll  
- Roll is computed using:

```solidity
roll = uint256(
    keccak256(abi.encodePacked(prevBlockHash, contractAddress, nonce))
) % 16;
```
- Prize pool increases until someone wins

- When a player rolls 0 - 5, they win the entire prize pool

- Prize pool resets to 10% of contract balance


### 🚨 Vulnerability:

blockhash (block.number - 1) is fully predictable by the caller.

🔹 RiggedRoll.sol Contract

A custom exploit contract that:

✔ Computes the next dice roll before playing  
✔ Uses blockhash(block.number - 1) locally  
✔ Only calls rollTheDice() when the result is winning  
✔ Forces the game to pay out  
✔ Repeats until the prize pool is drained  

This demonstrates a real-world deterministic randomness exploit on EVM chains.

---

## 🎮 Frontend dApp

A clean UI built using Scaffold-ETH 2 + Wagmi + RainbowKit, allowing you to:

- Connect wallet  
- View DiceGame state  
- View prize pool  
- Predict future rolls  
- Trigger the attack contract  
- Roll manually for testing  
- Debug contracts using SE-2 "Debug Contracts" panel  
- Inspect tx history using built-in Block Explorer  

🔍 How the Exploit Works (Simplified)

Blockchains are deterministic.  
blockhash (block.number - 1) is already known during the same block.

Therefore, the attack contract:

- Reads the same blockhash the DiceGame will use  
- Computes the roll locally  
- Only plays if roll == 0, 1, 2, 3, 4, 5
- Guarantees a win  
- Drains the prize pool  
- Repeats on the next block  

📌 Lesson:  
Never use blockhash, block.timestamp, or block.difficulty for randomness.

---

## 📐 Learning Outcomes

By completing this challenge, I learned:

- Why randomness on-chain must use VRF or commit–reveal  
- How blockhash-based randomness is predictable  
- How attackers time transactions for deterministic exploits  
- How to create attack contracts using Hardhat  
- How to design a UI around a security exploit  
- How to use Wagmi + Viem for contract interactions  
- How Scaffold-ETH 2 simplifies full-stack Ethereum workflows  
- How real-world DeFi hacks often begin with predictable entropy  

---

## 🎓 Part of SpeedRunEthereum

This project is part of:

🏃 SpeedRunEthereum — Challenge 03: Dice Game  
https://speedrunethereum.com/challenge/dice-game

Built using Scaffold-ETH 2, a modern and powerful Ethereum development stack.

