import { useTranslation } from "react-i18next";
import { sortBy } from "some-javascript-utils/array";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faClipboard } from "@fortawesome/free-solid-svg-icons";

// hooks
import useTimeAge from "../../hooks/useTimeAge";

// utils
import { saveHistoryToLocal } from "../../utils/localStorage";
import { useState } from "react";

// components
import Notification from "../Notification/Notification";

function History(props) {
  const { t } = useTranslation();

  const { history, setHistory, historyKey, onHistoryClick } = props;

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState();
  const [notificationMessage, setNotificationMessage] = useState();

  const historyCopySuccessful = () => {
    setShowNotification(true);
    setNotificationMessage(t("_accessibility:messages.historyCopied"));
    setNotificationType("success");
  };
  const historyCopyFailed = () => {
    setShowNotification(true);
    setNotificationMessage(t("_accessibility:errors.unknownError"));
    setNotificationType("error");
  };

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
                <button
                  onClick={() => {
                    navigator.clipboard
                      .writeText(hist.result)
                      .then(() => {
                        historyCopySuccessful();
                      })
                      .catch((err) => {
                        historyCopyFailed();
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
      ) : null}
      <Notification
        type={notificationType}
        message={notificationMessage}
        visible={showNotification}
        timer={2000}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}

export default History;
