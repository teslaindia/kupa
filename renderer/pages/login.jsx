import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");
  const shemOvedRef = React.useRef();
  const router = useRouter();

  const reshimatOvdim = ["אברהם", "אהרון", "אסף", "דביר", "אורן", "צחי"];

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
    <div>
      <Head>
        <title>התחברות אל הקופה הרושמת</title>
      </Head>
      <div>
        <h1>התחברות אל הקופה הרושמת</h1>
        <input
          type="text"
          placeholder="שם עובד"
          ref={shemOvedRef}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              if (!reshimatOvdim?.includes(shemOvedRef.current.value))
                return alert("שם העובד אינו קיים במערכת");

              if (!shemOvedRef.current.value)
                return alert("יש להקליד את שם העובד על מנת להתחבר למערכת");

              try {
                alert("ההתחברות למערכת הוצלחה! נשלחת לדף הראשי של המערכת");

                window?.ipc?.send("hithabrut", shemOvedRef.current.value);

                router.replace("/open");
              } catch (error) {
                alert(
                  "האם אתה משתמש בדפדפן רגיל או בתוכנת הקופה הרושמת? כי נכשלנו בליצור קשר עם המערכת."
                );
              }
            }
          }}
        />
        <br />
        <br />
        <button
          onClick={() => {
            if (!reshimatOvdim?.includes(shemOvedRef.current.value))
              return alert("שם העובד אינו קיים במערכת");

            if (!shemOvedRef.current.value)
              return alert("יש להקליד את שם העובד על מנת להתחבר למערכת");

            try {
              alert("ההתחברות למערכת הוצלחה! נשלחת לדף הראשי של המערכת");

              window?.ipc?.send("hithabrut", shemOvedRef.current.value);

              router.replace("/open");
            } catch (error) {
              alert(
                "האם אתה משתמש בדפדפן רגיל או בתוכנת הקופה הרושמת? כי נכשלנו בליצור קשר עם המערכת."
              );
            }
          }}
        >
          התחברות למערכת
        </button>
        <br />
      </div>
    </div>
  );
}
