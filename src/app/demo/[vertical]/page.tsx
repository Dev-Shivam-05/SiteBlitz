import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEMOS, type DemoId } from "@/lib/demos";
import { DemoSite } from "@/components/demo/DemoSite";

export function generateStaticParams() {
  return Object.keys(DEMOS).map((vertical) => ({ vertical }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ vertical: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vertical } = await params;
  const demo = DEMOS[vertical as DemoId];
  if (!demo) return {};
  return {
    title: `${demo.vertical} website demo`,
    description: `A SiteBlitz concept demo of a ${demo.vertical.toLowerCase()} website. Fictional business, simulated enquiry.`,
    // Fictional businesses must never be indexed or treated as LocalBusiness data (FD-45).
    robots: { index: false, follow: true },
    alternates: { canonical: `/demo/${demo.id}` },
  };
}

export default async function DemoPage({ params }: Props) {
  const { vertical } = await params;
  const demo = DEMOS[vertical as DemoId];
  if (!demo) notFound();
  return <DemoSite demo={demo} />;
}
