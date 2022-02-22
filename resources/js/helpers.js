"use strict";
import { TIMEOUT_SEC } from "./config.js";
import promiseRetry from "promise-retry";

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const runAfterDate = function (date, func) {
  const now = new Date();
  if (now > date) return func();
  else console.log("some code will run after " + date);
};

export const runBeforeDate = function (date, func) {
  const now = new Date();
  if (date > now) {
    console.log("some code will stop running  after " + date);
    return func();
  }
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

const retryConfig = {
  retries: 10,
  minTimeout: 1000,
  maxTimeout: Infinity,
  factor: 2,
  randomize: false,
};

// export function retry(fn, attempt = 1, retries = 10, err = null) {
//   console.log(`Attempt number ${attempt}.`);
//   if (!retries) {
//     return Promise.reject(err);
//   }
//   return fn().catch(err => {
//     return setTimeout(() => {
//       retry(fn, attempt + 1, retries - 1, err);
//     }, 1000);
//   });
// }

// export const AJAX = async function (url = SERVER_URL, uploadData = undefined) {
//   try {
//     const fetchPro = uploadData
//       ? fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(uploadData),
//         })
//       : fetch(url);
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const AJAX = async function (url, uploadData = undefined) {
//   try {
//     const fetchPro = promiseRetry(retryConfig, (retry, number) => {
//       console.log(`Attempt number ${number}.`);
//       return uploadData
//         ? fetch(url, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(uploadData),
//           }).catch(retry)
//         : fetch(url).catch(retry);
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const AJAX = async function (url, uploadData = undefined) {
//   try {
//     const fetchPro = uploadData
//       ? fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(uploadData),
//         })
//       : fetch(url);

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

export const fetchPlus = (url, retries = 0, timeout = 1000) =>
  fetch(url)
    .then(res => {
      console.log(res);
      console.log("Retries left: " + retries);
      if (res.ok) {
        return res.json();
      }
      if (retries > 0) {
        return setTimeout(() => fetchPlus(url, retries - 1), timeout);
      }
      throw new Error(res.status);
    })
    .catch(error => console.error(error.message));
