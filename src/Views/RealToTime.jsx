import { useCallback, useEffect, useState } from "react";
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

  const [history, setHistory] = useState([]);

  const calculate = (input) => {
    const result = convertHoursToHHMM(input);
    setResult(result);
    setHistory([...history, { input, result: result, time: new Date() }]);
  };

  useEffect(() => {
    if (history.length) saveHistoryToLocal("real-history", history);
  }, [history]);

  useEffect(() => {
    setHistory(loadHistoryFromLocal("real-history"));
  }, []);

  const onHistoryClick = (i) => {
    setValue(history[i].input);
    calculate(history[i].input);
  };

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:real-to-time.title")}</h2>

        <form
          className="flex flex-col items-center justify-start w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            calculate(value);
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
        <History
          history={history}
          setHistory={setHistory}
          historyKey="real-history"
          onHistoryClick={onHistoryClick}
        />
      </div>
      <p className="opacity w-full px-5 py-4 bg-alt-background fixed left-0 bottom-0">
        {t("_pages:real-to-time.result")}: {result}
      </p>
    </main>
  );
}

export default RealToTime;
