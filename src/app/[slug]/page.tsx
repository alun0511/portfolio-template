import styles from "./page.module.css";
import apiClient from "@/lib/cms/dato";

import { AllPagesDocument, PageDocument } from "@/types/graphql";

// export async function generateStaticParams() {
//   const { allPages } = await apiClient().request({
//     document: AllPagesDocument,
//   });

//   return allPages.map((page) => ({
//     slug: page.url.split("/"),
//   }));
// }

export default async function DynamicPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const data = await apiClient().request({
    document: PageDocument,
    variables: {
      eq: params.slug.join("/"),
    },
  });

  // if (!data.page) {
  //   return { notFound: true };
  // }

  console.log("dynamic page data:", data);
  console.log("params.slug:", params.slug);

  return (
    <main className={styles.main}>
      <h1>{data.page?.slug}</h1>
    </main>
  );
}
