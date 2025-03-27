import { useTranslation } from "react-i18next";
import { sortBy } from "some-javascript-utils/array";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// hooks
import useTimeAge from "../../hooks/useTimeAge";

// utils
import { saveHistoryToLocal } from "../../utils/localStorage";

// components
import HistoryButton from "../HistoryButton/HistoryButton";

function History(props) {
  const { t } = useTranslation();

  const { history, setHistory, historyKey, onHistoryClick } = props;

  const { timeAge } = useTimeAge();

  return (
    <>
      {history.length ? (
        <div className="apparition">
          <div className="flex justify-between">
            <h3 className="text-white text-lg">
              {t("_accessibility:labels.history")}
            </h3>
            <button
              type="button"
              onClick={() => {
                setHistory([]);
                saveHistoryToLocal(historyKey, []);
              }}
              name={t("_accessibility:buttons.clearHistory")}
              aria-label={t("_accessibility:ariaLabels.clearHistory")}
              className="text-red-400 hover:text-red-500"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>

          <ul className="mt-2 history">
            {sortBy(history, "time", false).map((hist, i) => (
              <li key={i} className="flex gap-1">
                <button
                  name={t("_accessibility:buttons.restoreValue")}
                  aria-label={t("_accessibility:ariaLabels.restoreValue")}
                  onClick={() => onHistoryClick(i)}
                  className="!text-gray-400 hover:!text-gray-300"
                >
                  {hist.input}
                </button>
                <p className="!text-gray-400">
                  = {hist.result} - {timeAge(hist.time)}
                </p>
                <HistoryButton hist={hist} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default History;
