import Link from "next/link";
import { Shell } from "@/components/site/Shell";

export default function NotFound() {
  return (
    <Shell>
      <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
        <p className="font-display text-[24vw] font-bold leading-none text-outline md:text-[14rem]">
          404
        </p>
        <h1 className="font-display -mt-4 text-2xl font-bold md:text-3xl">
          This page took the <span className="font-accent italic text-volt">wrong exit</span>
        </h1>
        <p className="mt-4 max-w-sm text-sm text-muted">
          The page you&apos;re after doesn&apos;t exist — but your next website does.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/" className="btn-volt rounded-full px-6 py-3 text-sm font-semibold">
            Back home
          </Link>
          <Link href="/contact" className="btn-ghost rounded-full px-6 py-3 text-sm text-ink">
            Start a project
          </Link>
        </div>
      </section>
    </Shell>
  );
}
