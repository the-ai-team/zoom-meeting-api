class LoggerClass {
  constructor(private logLevel = 0) {}

  setLogLevel(logLevel: number) {
    this.logLevel = logLevel;
  }

  info(message: string, ...data: any) {
    if (this.logLevel >= 4) {
      console.log(`Info: ${message}`, ...data);
    }
  }

  debug(message: string, ...data: any) {
    if (this.logLevel >= 3) {
      console.log(`Debug: ${message}`, ...data);
    }
  }

  warning(message: string, ...data: any) {
    if (this.logLevel >= 2) {
      console.log(`Warning: ${message}`, ...data);
    }
  }

  error(message: string, ...data: any) {
    if (this.logLevel >= 1) {
      console.log(`Error: ${message}`, ...data);
    }
  }
}

let loggerInstance: LoggerClass;

export const logger = () => {
  if (!loggerInstance) {
    loggerInstance = new LoggerClass();
  }
  return loggerInstance;
};
