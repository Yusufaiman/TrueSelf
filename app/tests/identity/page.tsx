import { TestCategoryPageContent } from "@/components/tests/TestCategoryPageContent";
import { TEST_CATEGORIES } from "@/config/testCategories";

export default function IdentityTestsPage() {
  const category = TEST_CATEGORIES.find((item) => item.id === "identity");

  return <TestCategoryPageContent category={category!} />;
}
