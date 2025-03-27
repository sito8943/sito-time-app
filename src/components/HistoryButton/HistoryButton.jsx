import { useState } from "react";
import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

// components
import Notification from "../Notification/Notification";

export default function HistoryButton(props) {
  const { hist } = props;

  const { t } = useTranslation();

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

  return (
    <>
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
