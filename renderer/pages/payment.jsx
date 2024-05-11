import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HomePage() {
  const [kupa, setKupa] = React.useState([]);
  const [shemOved, setShemOved] = React.useState("");
  const tashlumMethod = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    try {
      window?.ipc?.send("maHooShemHaOved");
      window?.ipc?.send("bdokpritimbakupa");
      window?.ipc?.on("shemOved", (shemHaOved) => {
        setShemOved(shemHaOved);

        if (!shemHaOved) {
          alert("אין שם עובד. נא להתחבר למערכת!");
          router.replace("/login");
        }
      });

      window?.ipc?.on("pritimbakupa", (pritim) => {
        setKupa(pritim);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>קופה רושמת</title>
      </Head>
      {/* center the div */}
      <div>
        <h3>שלום, {shemOved}</h3>
        <button
          onClick={() => {
            alert(`מתנתק מ ${shemOved}, יש ללחוץ על הכפתור על מנת להמשיך.`);
            window?.ipc?.send("hitnatkoot");
            router.replace("/login");
          }}
        >
          לא {shemOved}? התנתקות
        </button>
        {/* make me some pritim (items) that the kupai (employee) can add to the kupa (cart) */}
        <h1>פריטים</h1>
        <h3>סה"כ: ₪{kupa.reduce((acc, curr) => acc + curr.price, 0)}</h3>
        {kupa.map((paritKupa, index) => {
          return (
            <div key={index}>
              <Image
                src={paritKupa?.tmuna}
                alt={paritKupa.name}
                width={40}
                height={40}
              ></Image>
              <p>{paritKupa.name}</p>
              <p>₪{paritKupa.price}</p>
              <button
                onClick={() => {
                  setKupa(kupa.filter((_, i) => i !== index));
                }}
              >
                ❌ מחיקה
              </button>
            </div>
          );
        })}
        <br />
        <button>כיצד לשלם?</button>
        {!tashlumMethod ? (
          <button
            onClick={() => {
              alert("העסקה בוצעה בהצלחה. נשלח לדף הראשי של המערכת.");
              window?.ipc?.send("heshbon", kupa);
              router.replace("/open");
            }}
          >
            סיום עסקה
          </button>
        ) : (
          <div>
            <button
              onClick={() => {
                alert("העסקה בוצעה בהצלחה. נשלח לדף הראשי של המערכת.");
                window?.ipc?.send("heshbon", kupa);
                router.replace("/open");
              }}
            >
              כרטיס אשראי
            </button>
            <button
              onClick={() => {
                alert("העסקה בוצעה בהצלחה. נשלח לדף הראשי של המערכת.");
                window?.ipc?.send("heshbon", kupa);
                router.replace("/open");
              }}
            >
              כרטיס אשראי (תשלומים)
            </button>
            <button
              onClick={() => {
                alert("העסקה בוצעה בהצלחה. נשלח לדף הראשי של המערכת.");
                window?.ipc?.send("heshbon", kupa);
                router.replace("/open");
              }}
            >
              מזומן
            </button>
          </div>
        )}
        <button
          onClick={() => {
            alert("העסקה בוטלה. נשלח לדף הראשי של המערכת.");
            window?.ipc?.send("bituliska");
            router.replace("/open");
          }}
        >
          ביטול עסקה
        </button>
      </div>
    </div>
  );
}
