import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// import { WalletProvider } from "../../state/wallet/WalletProvider";
import styles from "../../styles/Home.module.css";
import toast, { Toaster } from "react-hot-toast";
// import { ModalProvider } from "../../state/ModalProvider";
import { MoralisProvider } from "react-moralis";
import Header from "../Header/Header";
import { CreateAClubContextProvider } from "../../context/CreateAClubContextProvider";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MoralisProvider
        appId={"VidDWLi2yg4W1Z7oKzb6jhSEHrkKdvnpa9Sepl57"}
        serverUrl={"https://gth94kjdatgn.usemoralis.com:2053/server"}
      >
        <CreateAClubContextProvider>
          <CreateAClubContextProvider>
            <>
              <Head>
                <title>Build Ideas</title>
              </Head>

              <Header />
              <div className="pt-16 min-h-screen">
                <Toaster position="bottom-right" />
                {children}
              </div>
              <footer className={styles.footer}>
                <a
                  href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Powered by{" "}
                  <span className={styles.logo}>
                    <Image
                      src="/vercel.svg"
                      alt="Vercel Logo"
                      width={72}
                      height={16}
                    />
                  </span>
                </a>
              </footer>
            </>
          </CreateAClubContextProvider>
        </CreateAClubContextProvider>
      </MoralisProvider>
    </>
  );
}
