import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTimeAge from "../hooks/useTimeAge";

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
    const result = convertHoursToHHMM(value);
    setResult(result);
    setHistory([...history, { result: result, time: new Date() }]);
  }

  const [history, setHistory] = useState([]);

  const { timeAge } = useTimeAge();

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:real-to-time.title")}</h2>

        <form
          className="flex flex-col items-center justify-start w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            calculate();
          }}
        >
          <input
            required
            value={value}
            className="input w-full"
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder={t("_pages:real-to-time.input.placeholder")}
          />
          <div className="w-full flex gap-2">
            <button
              type="submit"
              className="button primary flex-1"
              name={t("_accessibility:buttons.calculate")}
              aria-label={t("_accessibility:ariaLabels.calculate")}
            >
              {t("_accessibility:buttons.calculate")}
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("");
                setResult("");
              }}
              className="button flex-1"
              name={t("_accessibility:buttons.clear")}
              aria-label={t("_accessibility:ariaLabels.clear")}
            >
              {t("_accessibility:buttons.clear")}
            </button>
          </div>
        </form>
        <div>
          <div className="flex justify-between">
            <h3 className="text-white text-lg">
              {t("_accessibility:labels.history")}
            </h3>
            <button
              type="button"
              onClick={() => setHistory([])}
              name={t("_accessibility:buttons.clearHistory")}
              aria-label={t("_accessibility:ariaLabels.clearHistory")}
              className="text-red-400 hover:text-red-500"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>

          <ul className="mt-2 history">
            {history.map((hist, i) => (
              <li key={i} className="flex gap-2">
                <p className="!text-gray-400">
                  {hist.result} - {timeAge(hist.time)}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="w-full px-5 py-4 bg-alt-background fixed left-0 bottom-0">
          {t("_pages:real-to-time.result")}: {result}
        </p>
      </div>
    </main>
  );
}

export default RealToTime;
