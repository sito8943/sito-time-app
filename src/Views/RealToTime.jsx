import { useState } from "react";
import { useTranslation } from "react-i18next";

function convertHoursToHHMM(hours) {
  const hh = Math.floor(hours); // Horas enteras
  const mm = Math.round((hours - hh) * 60); // Minutos redondeados
  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
}

function RealToTime() {
  const { t } = useTranslation();

  const [result, setResult] = useState("");
  const [value, setValue] = useState("");

  async function calculate() {
    setResult(convertHoursToHHMM(value));
  }

  return (
    <main className="flex flex-col gap-5 px-5 pt-5">
      <h2 className="text-xl">{t("_pages:real-to-time.title")}</h2>

      <form
        className="flex flex-col items-center justify-start w-full gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
      >
        <input
          className="input w-full"
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Cantidad de horas (Ej: 2.01)"
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
      <p className="w-full px-1">Resultado: {result}</p>
    </main>
  );
}

export default RealToTime;
