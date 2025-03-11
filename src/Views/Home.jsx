import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <main className="w-full h-full p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-3xl text-center">
          {t("_pages:home.welcome")}
          <br />
          {t("_pages:home.appName")}
        </h2>
        <p className="text-center text-balance">
          {t("_pages:home.description")}
        </p>
        <p className="text-balance text-center">{t("_pages:home.tutorial")}</p>
        <div className="flex items-center justify-center">
          <a
            target="_blank"
            rel="noreferrer"
            name={t("_accessibility:buttons.github")}
            aria-label={t("_accessibility:ariaLabels.github")}
            href="https://github.com/sito8943/sito-time-app"
            className="text-white hover:text-primary text-2xl"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </main>
  );
}

export default Home;
