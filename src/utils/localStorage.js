/**
 *
 * @param {string} key key of item
 * @param {object} obj object to save
 */
export function saveToLocal(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

/**
 *
 * @param {string} key key of item
 * @returns {object} item history from local
 */
export function loadHistoryFromLocal(key) {
  const hist = localStorage.getItem(key);
  try {
    if (hist && hist.length)
      return JSON.parse(hist).map((hist) => ({
        ...hist,
        time: new Date(hist.time),
      }));
  } catch (err) {
    console.error(err);
    return [];
  }
}
