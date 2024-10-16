import apiClient from "@/lib/cms/dato";
import { NavigationDocument } from "@/types/graphql";
import internal from "stream";
import Link from "../link";

export default async function Navigation() {
  const data = await apiClient().request({
    document: NavigationDocument,
  });
  return (
    <>
      {data.navigation?.navigationLinks.map((link, index) => {
        return <Link />;
      })}
    </>
  );
}
