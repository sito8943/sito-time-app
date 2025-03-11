/**
 *
 * @param {string} key key of item
 * @param {object} obj object to save
 */
export function saveHistoryToLocal(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

/**
 *
 * @param {object} obj object to save
 */
export function saveSumToLocal(obj) {
  localStorage.setItem("sum", JSON.stringify(obj));
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
  }
  return [];
}

/**
 *
 * @returns {string[]} sum from local
 */
export function loadSumFromLocal() {
  const sum = localStorage.getItem("sum");
  try {
    if (sum && sum.length) return JSON.parse(sum);
  } catch (err) {
    console.error(err);
  }
  return [];
}
