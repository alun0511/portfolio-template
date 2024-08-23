import Image from "next/image";
import styles from "./page.module.css";
import apiClient from "@/lib/cms/dato";

import { AllPagesDocument, HomePageDocument } from "@/types/graphql";

export default async function Home() {
  const data = await apiClient().request({
    document: HomePageDocument,
  });

  console.log("Home data", data);

  // console.log(
  //   data.allPages.map((page) => ({
  //     slug: page.url.split("/"),
  //   }))
  // );

  return (
    <main className={styles.main}>
      <h1>HOME</h1>
    </main>
  );
}
/* {data.allPages.map((page, index) => {
  return (
    <a key={index} href={page.slug}>
      {page.slug}
    </a>
  );
})} */
