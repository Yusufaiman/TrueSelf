import { notFound } from "next/navigation";
import { TEST_CATEGORIES } from "@/config/testCategories";
import { TestCategoryPageContent } from "@/components/tests/TestCategoryPageContent";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = TEST_CATEGORIES.find((item) => item.id === categorySlug);

  if (!category) {
    notFound();
  }

  return <TestCategoryPageContent category={category} />;
}
