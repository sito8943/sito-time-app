import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import History from "../components/History/History";

// utils
import { convertHoursToHHMM } from "../utils/utils";
import {
  loadHistoryFromLocal,
  saveHistoryToLocal,
} from "../utils/localStorage";

function RealToTime() {
  const { t } = useTranslation();

  const [result, setResult] = useState("");
  const [value, setValue] = useState("");

  async function calculate() {
    const result = convertHoursToHHMM(value);
    setResult(result);
    setHistory([
      ...history,
      { input: value, result: result, time: new Date() },
    ]);
  }

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (history.length) saveHistoryToLocal("real-history", history);
  }, [history]);

  useEffect(() => {
    setHistory(loadHistoryFromLocal("real-history"));
  }, []);

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
        <History history={history} setHistory={setHistory} key="real-history" />
      </div>
      <p className="opacity w-full px-5 py-4 bg-alt-background fixed left-0 bottom-0">
        {t("_pages:real-to-time.result")}: {result}
      </p>
    </main>
  );
}

export default RealToTime;
