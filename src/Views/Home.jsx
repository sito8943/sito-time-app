import React from "react";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <main className="w-full h-full p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-3xl text-center">{t("_pages:home.welcome")}</h2>
        <p className="text-center text-balance">
          {t("_pages:home.description")}
        </p>
        <p className="text-balance text-center">{t("_pages:home.tutorial")}</p>
      </div>
    </main>
  );
}

export default Home;
