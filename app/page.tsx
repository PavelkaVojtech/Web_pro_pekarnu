import React from "react";
import Layout from "./componets/layout";
import HeroSection from "./componets/heroSection";
import MeziSekce from "./componets/meziSekce";


export default function Home() {
  return (
    <div>
      <main>
        <Layout>
          <HeroSection />
          <MeziSekce />
        </Layout>
      </main>
    </div>
  );
}
