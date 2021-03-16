const loggerConfig = {
  mode: process.env.VUE_APP_LOGGER_MODE || 'production',
};

export function logger(...args) {
  if (loggerConfig.mode === 'debug') {
    args.unshift(`[DEBUG][ ${new Date().toUTCString()}]: `);
    console.log(...args);
  }
}

export function saveAppLogs(...data) {
  let logs = localStorage.getItem('app-logs');
  let date = new Date().toUTCString();

  if (logs === null) {
    const lastLog = JSON.stringify([{ date, log: data }], null, 2);
    localStorage.setItem('app-logs', lastLog);
    return;
  }

  logs = JSON.parse(logs)
  logs.push({ date, log: data.flat(Infinity) });
  logs = JSON.stringify(logs, null, 2);
  return localStorage.setItem('app-logs', logs);
}
