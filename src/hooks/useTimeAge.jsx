import { useCallback } from "react";
import { useTranslation } from "react-i18next";

function useTimeAge() {
  const { t, i18n } = useTranslation();

  const timeAge = useCallback(
    (date) => {
      const now = new Date();
      const diffInMilliseconds = now - date;
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);

      // Traducciones condicionales

      const isSpanish = i18n.language === "es";
      const ago = t("_accessibility:labels.ago");
      const minute = t("_accessibility:labels.minute");
      const minutes = t("_accessibility:labels.minutes");
      const hour = t("_accessibility:labels.hour");
      const hours = t("_accessibility:labels.hours");
      const yesterday = t("_accessibility:labels.yesterday");
      const justNow = t("_accessibility:labels.justNow");

      if (diffInMilliseconds < 1000 * 60) {
        return justNow;
      }
      if (diffInMinutes < 60) {
        return `${isSpanish ? ago : ""} ${diffInMinutes} ${
          diffInMinutes === 1 ? minute : minutes
        } ${isSpanish ? "" : ago}`;
      }
      if (diffInHours < 24) {
        return `${isSpanish ? ago : ""} ${diffInHours} ${
          diffInHours === 1 ? hour : hours
        } ${isSpanish ? "" : ago}`;
      }
      if (diffInHours < 48) {
        return yesterday;
      }

      // Formatear fecha como DD/MM/YYYY
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    [t, i18n]
  );

  return { timeAge };
}

export default useTimeAge;
