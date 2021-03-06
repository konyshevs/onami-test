"use strict";
import { TIMEOUT_SEC } from "./config.js";

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
