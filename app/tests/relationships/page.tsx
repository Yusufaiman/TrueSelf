import { TestCategoryPageContent } from "@/components/tests/TestCategoryPageContent";
import { TEST_CATEGORIES } from "@/config/testCategories";

export default function RelationshipsTestsPage() {
  const category = TEST_CATEGORIES.find((item) => item.id === "relationships");

  return <TestCategoryPageContent category={category!} />;
}
