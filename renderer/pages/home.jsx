import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");

  React.useEffect(() => {
    try {
      window?.ipc?.on("message", (message) => {
        setMessage(message);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-javascript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width="256px"
          height="256px"
        />
      </div>
      <div>
        <button
          onClick={() => {
            window.ipc.send("message", "Hello");
          }}
        >
          Test IPC
        </button>
        <p>{message}</p>
      </div>
    </React.Fragment>
  );
}
