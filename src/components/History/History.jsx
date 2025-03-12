import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faClipboard } from "@fortawesome/free-solid-svg-icons";

// hooks
import useTimeAge from "../../hooks/useTimeAge";

// utils
import { saveHistoryToLocal } from "../../utils/localStorage";

function History(props) {
  const { t } = useTranslation();

  const { history, setHistory, key, onHistoryClick } = props;

  const { timeAge } = useTimeAge();

  return history.length ? (
    <div className="apparition">
      <div className="flex justify-between">
        <h3 className="text-white text-lg">
          {t("_accessibility:labels.history")}
        </h3>
        <button
          type="button"
          onClick={() => {
            setHistory([]);
            saveHistoryToLocal(key, []);
          }}
          name={t("_accessibility:buttons.clearHistory")}
          aria-label={t("_accessibility:ariaLabels.clearHistory")}
          className="text-red-400 hover:text-red-500"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <ul className="mt-2 history">
        {history.map((hist, i) => (
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
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(hist.result)
                  .then(() => {
                    console.log("Text successfully copied to clipboard!");
                  })
                  .catch((err) => {
                    console.error("Error copying text to clipboard: ", err);
                  });
              }}
              name={t("_accessibility:buttons.copyToClipboard")}
              aria-label={t("_accessibility:ariaLabels.copyToClipboard")}
              className="ml-1 text-primary/40 hover:text-primary"
            >
              <FontAwesomeIcon icon={faClipboard} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}

export default History;
