"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { log } from "console";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
              
  allPages {
    id
    url
    _status
    _firstPublishedAt
  }
}
            `,
        }),
      });

      const json = await res.json();
      setData(json.data);
    }

    fetchData();
  }, []);

  console.log(data);
  console.log("token", process.env.DATOCMS_API_TOKEN);

  return (
    <main className={styles.main}>
      <h1>alfredunenge.se</h1>
    </main>
  );
}
