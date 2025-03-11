import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// hooks
import useTimeAge from "../../hooks/useTimeAge";

// utils
import { saveHistoryToLocal } from "../../utils/localStorage";

function History(props) {
  const { t } = useTranslation();

  const { history, setHistory, key } = props;

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
          <li key={i} className="flex gap-2">
            <p className="!text-gray-400">
              {hist.input} = {hist.result} - {timeAge(hist.time)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}

export default History;
