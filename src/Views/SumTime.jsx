import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

// utils
import { sumTimes } from "../utils/utils";

function SumTime() {
  const { t } = useTranslation();

  const [result, setResult] = useState("");
  const [times, setTimes] = useState([]);

  const removeTime = useCallback(
    (index) => {
      const newTimes = [...times];
      newTimes.splice(index, 1);
      setTimes(newTimes);
    },
    [times]
  );

  const addTime = useCallback((el) => setTimes([...times, el]), [times]);

  const [value, setValue] = useState("");

  async function calculate() {
    setResult(sumTimes(times));
  }

  useEffect(() => {
    if (times?.length > 0) calculate(times);
    else setResult("");
  }, [times]);

  return (
    <main className="p-5">
      <div className="apparition flex flex-col gap-5">
        <h2 className="text-xl">{t("_pages:sum-time.title")}</h2>

        <form
          className="flex flex-col items-center justify-start w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addTime(value);
            setValue("");
          }}
        >
          <input
            required
            value={value}
            className="input w-full"
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder={t("_pages:sum-time.input.placeholder")}
          />
          <div className="w-full flex gap-2">
            <button
              type="submit"
              className="button primary flex-1"
              name={t("_accessibility:buttons.add")}
              aria-label={t("_accessibility:ariaLabels.add")}
            >
              {t("_accessibility:buttons.add")}
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
        {times.length > 0 ? (
          <div className="apparition">
            <h3 className="text-white text-lg mb-2">
              {t("_pages:sum-time.sum")}
            </h3>
            <ul className="flex gap-2 flex-wrap">
              {times.map((time, i) => (
                <li key={i} className="flex items-center apparition">
                  <p className="input !px-5 !rounded-r-none">{time}</p>{" "}
                  <button
                    type="button"
                    onClick={() => removeTime(i)}
                    className="button !rounded-l-none"
                    name={t("_accessibility:buttons.remove")}
                    aria-label={t("_accessibility:ariaLabels.remove")}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="w-full px-5 py-4 bg-alt-background fixed left-0 bottom-0">
          {t("_pages:sum-time.result")}: {result}
        </p>
      </div>
    </main>
  );
}

export default SumTime;
