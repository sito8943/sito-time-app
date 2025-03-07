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
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setResult(hhmmToHours(value).toFixed(2));
  }

  return (
    <main className="flex flex-col gap-5 mt-5">
      <h2 className="text-xl">{t("_pages:time-to-real.title")}</h2>

      <form
        className="flex items-center justify-start w-full"
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
      >
        <input
          className="input"
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder={t("_pages:time-to-real.input.placeholder")}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-gray-100 hover:text-white px-4 py-1"
        >
          {t("_accessibility:buttons.calculate")}
        </button>
      </form>
      <p className="w-full px-1">Resultado: {result}</p>
    </main>
  );
}

export default TimeToReal;
