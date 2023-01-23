import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import CsvFileInput from "../components/CsvFileInput";
import TokenAirdrop from "../components/TokenAirdrop";
import useEagerConnect from "../hooks/useEagerConnect";
import React, {useState} from "react";


function Home() {
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  const [tokenRecipients, setTokenRecipients] = useState<string[]>([]);
  const [tokenAmounts, setTokenAmounts] = useState([]);

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>airdrop-dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/">airdrop-dapp</Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        <h1>
          Welcome to{" "}
          <a>
            Airdrop Dapp
          </a>
        </h1>

        {isConnected && (
          <section>
            <ETHBalance/>
            <CsvFileInput
              setTokenRecipients={setTokenRecipients}
              setTokenAmounts={setTokenAmounts}
            />
            {tokenAmounts.length > 0 && <TokenAirdrop
              tokenRecipients={tokenRecipients}
              tokenAmounts={tokenAmounts}
            />
            }
          </section>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
