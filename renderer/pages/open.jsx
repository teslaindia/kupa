import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Popup from "../components/Popup"; // Path to your Popup component

export default function HomePage() {
  const [kupa, setKupa] = React.useState([]);
  const [shemOved, setShemOved] = React.useState("");
  const router = useRouter();

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [pritim, setPritim] = React.useState([
    {
      name: "קולה",
      price: 5,
      tmuna:
        "https://alcohol123.co.il/wp-content/uploads/2020/03/%D7%A7%D7%95%D7%9C%D7%94-%D7%A8%D7%92%D7%99%D7%9C%D7%94-3%D7%96%D7%9B%D7%95%D7%9B%D7%99%D7%AA.jpg",
    },
    {
      name: "פיצה",
      price: 25,
      tmuna:
        "https://medias.hashulchan.co.il/www/uploads/2020/12/shutterstock_658408219-600x600.jpg",
    },
    {
      name: "קוטג'",
      price: 10,
      tmuna:
        "https://d226b0iufwcjmj.cloudfront.net/product-images/global/12053/972770/large.jpg",
    },
    {
      name: "מים",
      price: 3,
      tmuna:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0oJ8BJQO3rpW9COGmpVwLD8inaBSuMFnIKYzLYkGLvw&s",
    },
    {
      name: "פרג",
      price: 6,
      tmuna:
        "https://maimons.co.il/wp-content/uploads/2019/07/7290013145055.png",
    },
    {
      name: "בירה",
      price: 10,
      tmuna:
        "https://www.banamashkaot.co.il/images/itempics/7290010237685_090320231605581.jpg",
    },
  ]);

  React.useEffect(() => {
    try {
      window?.ipc?.send("maHooShemHaOved");
      window?.ipc?.on("shemOved", (shemHaOved) => {
        setShemOved(shemHaOved);

        if (!shemHaOved) {
          alert("אין שם עובד. נא להתחבר למערכת!");
          router.replace("/login");
        }
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
      {isPopupOpen && <Popup onClose={closePopup} paritPrice={"?"} />}
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
        {pritim.map((parit, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setKupa([...kupa, parit]);
              }}
            >
              <Image
                src={parit?.tmuna}
                alt={parit.name}
                width={50}
                height={50}
              ></Image>
              <p>{parit.name}</p>
              <p>₪{parit.price}</p>
            </button>
          );
        })}
        {/* give me more pritim */}
        <br />
        {/* calculate the price for each item in the kupa */}
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
                  // use something else instead of prompt
                  // const newPrice = prompt("הכנס את המחיר החדש");
                  setIsPopupOpen(true);
                  // if (!newPrice) return;
                  setKupa(
                    kupa.map((parit, i) => {
                      if (i === index) {
                        return { ...parit, price: Number(newPrice) };
                      }
                      return parit;
                    })
                  );
                }}
              >
                שינוי מחיר
              </button>
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
        <button
          disabled={kupa?.length < 1}
          onClick={() => {
            window?.ipc?.send("maavarletashlum", kupa);
            router.replace("/payment");
          }}
        >
          🛒 מעבר לתשלום
        </button>
      </div>
    </div>
  );
}
