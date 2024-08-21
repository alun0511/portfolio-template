import Image from "next/image";
import styles from "./page.module.css";
import { log } from "console";
import apiClient from "@/lib/cms/dato";

import { AllPagesDocument } from "@/types/graphql";

export default async function Home() {
  const data = await apiClient().request({ document: AllPagesDocument });

  console.log(data);

  return (
    <main className={styles.main}>
      <h1>alfredunenge.se</h1>
    </main>
  );
}
