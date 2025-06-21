import HeroSlider from "@/components/HeroSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";

export default function HomePage() {
  return (
    <main className="bg-gray-100">
      <HeroSlider />
      <FeaturedProducts />
      <CategorySection />
    </main>
  );
}
