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
