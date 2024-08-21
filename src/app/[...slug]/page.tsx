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
  params: { slug: string[]; lang: string };
}) {
  const data = await apiClient().request({
    document: PageDocument,
    variables: {
      eq: params.slug.join("/"),
    },
  });

  console.log(data.page);

  return (
    <main className={styles.main}>
      <h1>{data.page?.url}</h1>
    </main>
  );
}
