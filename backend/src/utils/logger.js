import util from 'util';

const LOG_LEVELS = ['error', 'warn', 'info', 'debug'];
const configuredLevel = process.env.LOG_LEVEL || 'info';
const threshold = LOG_LEVELS.indexOf(configuredLevel);

function formatMessage(level, message, meta) {
  const timestamp = new Date().toISOString();
  const base = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  if (!meta) {
    return base;
  }

  const serialized =
    meta instanceof Error
      ? meta.stack
      : typeof meta === 'object'
      ? util.inspect(meta, { depth: 3, colors: false })
      : meta;

  return `${base} :: ${serialized}`;
}

function log(level, message, meta) {
  if (LOG_LEVELS.indexOf(level) > threshold) {
    return;
  }
  // eslint-disable-next-line no-console
  console[level === 'debug' ? 'log' : level](formatMessage(level, message, meta));
}

const logger = {
  error: (message, meta) => log('error', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  info: (message, meta) => log('info', message, meta),
  debug: (message, meta) => log('debug', message, meta),
};

export default logger;

