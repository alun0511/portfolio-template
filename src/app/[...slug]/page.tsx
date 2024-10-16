import styles from "./page.module.css";
import apiClient from "@/lib/cms/dato";

import { PageDocument } from "@/types/graphql";
import { notFound } from "next/navigation";

export default async function DynamicPage({
  params,
}: {
  params: { slug: string[] };
}) {
  console.log(params.slug.join());

  const data = await apiClient().request({
    document: PageDocument,
    variables: {
      eq: params.slug.join(),
    },
  });

  console.log(data);

  if (!data.page) {
    notFound();
  }

  return (
    <main className={styles.main}>{/* <h1>{data.page?.slug}</h1> */}</main>
  );
}
