import PageLayout from "@ft/ui-components/frontend/PageLayout";
import Hero from '@ft/ui-components/frontend/heroBanner';
import Pricing from '@ft/ui-components/frontend/Pricing'
export default function Home() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <Hero />
      </div>
      <Pricing />
    </PageLayout>
  );
}
