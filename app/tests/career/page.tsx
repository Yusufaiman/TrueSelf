import { TestCategoryPageContent } from "@/components/tests/TestCategoryPageContent";
import { TEST_CATEGORIES } from "@/config/testCategories";

export default function CareerTestsPage() {
  const category = TEST_CATEGORIES.find((item) => item.id === "career");

  return <TestCategoryPageContent category={category!} />;
}
