class LoggerClass {
  constructor(private logLevel = 0) {}

  setLogLevel(logLevel: number) {
    this.logLevel = logLevel;
  }

  info(message: string, ...data: any) {
    if (this.logLevel >= 4) {
      // tslint:disable-next-line: no-console
      console.log(`Info: ${message}`, ...data);
    }
  }

  debug(message: string, ...data: any) {
    if (this.logLevel >= 3) {
      // tslint:disable-next-line: no-console
      console.log(`Debug: ${message}`, ...data);
    }
  }

  warning(message: string, ...data: any) {
    if (this.logLevel >= 2) {
      // tslint:disable-next-line: no-console
      console.log(`Warning: ${message}`, ...data);
    }
  }

  error(message: string, ...data: any) {
    if (this.logLevel >= 1) {
      // tslint:disable-next-line: no-console
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
