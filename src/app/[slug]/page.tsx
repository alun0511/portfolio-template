import styles from "./page.module.css";
import apiClient from "@/lib/cms/dato";

import { AllPagesDocument, PageDocument } from "@/types/graphql";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { allPages } = await apiClient().request({
    document: AllPagesDocument,
  });
  return allPages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const { page } = await apiClient().request({
    document: PageDocument,
    variables: {
      eq: params.slug,
    },
  });

  if (!page) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <h1>/{page?.slug}</h1>
    </main>
  );
}
