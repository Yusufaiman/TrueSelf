import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import {
  getColorClasses,
  getIcon,
  type TestCategory,
} from "@/config/testCategories";

interface TestCategoryPageContentProps {
  category: TestCategory;
}

export function TestCategoryPageContent({
  category,
}: TestCategoryPageContentProps) {
  const Icon = getIcon(category.icon);
  const colorClasses = getColorClasses(category.color);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div
            className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${category.colorClass} text-white shadow-md`}
          >
            <Icon size={30} />
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div
                className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${colorClasses.bg} ${colorClasses.text}`}
              >
                <Layers size={16} />
                {category.journeyStage}
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                {category.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                {category.description}
              </p>
            </div>
            <Link
              href={category.href}
              className={`inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${category.colorClass} px-6 py-3 font-semibold text-white shadow-md transition hover:shadow-lg`}
            >
              Start Test
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            What this category helps you discover
          </p>
          <p className="mt-3 text-base leading-7 text-slate-700">
            {category.discover}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {category.tests.map((test, index) => {
            return (
              <article
                key={test}
                className="flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${colorClasses.bg} ${colorClasses.text}`}
                  >
                    {index + 1}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {category.journeyStage}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{test}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  One complete assessment for this category, designed to give
                  you the core insight without splitting the journey into
                  smaller quizzes.
                </p>
                <Link
                  href={category.href}
                  className={`mt-5 inline-flex items-center gap-2 font-semibold ${colorClasses.text}`}
                >
                  Start Test
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
