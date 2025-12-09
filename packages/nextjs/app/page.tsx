"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5 max-w-4xl">
          {/* HEADER */}
          <h1 className="text-center">
            <span className="block text-2xl mb-2">SpeedRunEthereum</span>
            <span className="block text-4xl font-bold">Challenge 03 — 🎲 Dice Game</span>
            <span className="block text-lg mt-2">
              Predict the “randomness” and attack the vulnerable dice roll logic.
            </span>
          </h1>

          {/* CONNECTED WALLET */}
          <div className="flex justify-center items-center space-x-2 flex-col mt-6">
            <p className="my-2 font-medium text-lg">Connected Wallet:</p>
            <Address address={connectedAddress} />
          </div>

          {/* HERO IMAGE */}
          <div className="flex flex-col items-center justify-center mt-10">
            <Image
              src="/hero.png"
              width="727"
              height="231"
              alt="Challenge banner"
              className="rounded-xl border-4 border-primary"
            />
          </div>

          {/* CONTENT */}
          <div className="mt-10 space-y-6 text-lg">
            <p>
              🎰 <strong>Randomness on-chain is hard. </strong>  
              Public blockchains are deterministic — meaning anyone can predict values ahead of time if randomness is not handled securely.
            </p>

            <p>
              In this challenge, the <strong>DiceGame contract uses a weak randomness source</strong>:
            </p>

            <pre className="bg-base-200 p-4 rounded-xl overflow-auto text-sm">
{`roll = uint256(
    keccak256(abi.encodePacked(prevBlockHash, contractAddress, nonce))
) % 16;`}
            </pre>

            <p>
              This allows an attacker to compute the exact same hash <strong>off-chain or inside another contract </strong> 
              and only roll the dice when they are guaranteed to win.
            </p>

            <p>
              💰 Players send <strong>0.002 ETH</strong> to roll.  
              40% goes to the prize pool.  
              60% stays in the contract to sustain future payouts.
            </p>

            <p>
              🔥 <strong>Your mission:</strong> Deploy an attack contract that predicts the roll before submitting the transaction — and only roll when the result equals the winning number.
            </p>
          </div>

          {/* CONTRACT ADDRESSES */}
          <div className="mt-10 space-y-6 text-lg">
            <p>The smart contracts were successfully deployed on Sepolia:</p>

              <p className="font-semibold">
                DiceGame:{" "}
                <Link
                  href="https://sepolia.etherscan.io/address/0xF3AE4CC418223e902dAF667b462d38856b08F1E3"
                  passHref
                  className="link"
                >
                  0xF3AE4CC418223e902dAF667b462d38856b08F1E3
                </Link>
                <br />
                AttackContract:{" "}
                <Link
                  href="https://sepolia.etherscan.io/address/0x7F96792aad28d8c432D3e7b1C3C52e3d6ED5DD9b"
                  passHref
                  className="link"
                >
                  0x7F96792aad28d8c432D3e7b1C3C52e3d6ED5DD9b
                </Link>
              </p>

                  <p>
                In this UI, you will be able to:
                <br />
                🎯 Compute future winning rolls  
                🔍 View the current prize pool  
                🧮 Predict block hashes  
                🕹 Roll the dice only when profitable  
                💥 Exploit the deterministic randomness safely
              </p>

              <p>
                This challenge teaches how to exploit — and eventually defend
                against —{" "}
                <strong>blockhash-based randomness vulnerabilities</strong> used
                in many older Ethereum contracts.
              </p>

              <p>
                Build, break, exploit, learn — powered by{" "}
                <strong>
                  Scaffold-ETH 2, Next.js, Wagmi, RainbowKit, Viem, and Hardhat.
                </strong>
              </p>
          </div>

          <p className="text-center text-lg mt-16">
              <a
                href="https://speedrunethereum.com/challenge/dice-game"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                SpeedRunEthereum.com
              </a>
            </p>
          
        </div>

        {/* FOOTER BLOCKS */}
        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col md:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Interact with your contracts using{" "}
                <Link href="/debug" className="link">
                  Debug Contracts
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore network activity in{" "}
                <Link href="/blockexplorer" className="link">
                  Block Explorer
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
