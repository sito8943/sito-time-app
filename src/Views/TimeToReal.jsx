import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 *
 * @param {string} time
 * @returns {number} result
 */
function hhmmToHours(time) {
  const [hh, mm] = time.split(":").map(Number); // Separar y convertir a números
  return hh + mm / 60; // Convertir minutos a fracción de hora
}

function TimeToReal() {
  const { t } = useTranslation();

  const [result, setResult] = useState("");
  const [value, setValue] = useState("");

  async function calculate() {
    setResult(hhmmToHours(value).toFixed(2));
  }

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:time-to-real.title")}</h2>

        <form
          className="flex flex-col items-center justify-start w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            calculate();
          }}
        >
          <input
            required
            className="input w-full"
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder={t("_pages:time-to-real.input.placeholder")}
          />
          <div className="w-full flex">
            <button
              type="submit"
              className="button primary flex-1"
              name={t("_accessibility:buttons.calculate")}
              aria-label={t("_accessibility:ariaLabels.calculate")}
            >
              {t("_accessibility:buttons.calculate")}
            </button>
            <button
              type="submit"
              className="button flex-1"
              name={t("_accessibility:buttons.clear")}
              aria-label={t("_accessibility:ariaLabels.clear")}
            >
              {t("_accessibility:buttons.clear")}
            </button>
          </div>
        </form>
        <p className="w-full px-1">
          {t("_pages:real-to-time.result")}: {result}
        </p>
      </div>
    </main>
  );
}

export default TimeToReal;
