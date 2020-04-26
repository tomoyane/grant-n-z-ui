export class Logger {

  public static Logger() {
    return new Logger();
  }

  static debug(...v: any[]): void {
    console.log(v);
  }

  static info(...v: any[]): void {
  }

  static warn(...v: any[]): void {
  }

  static error(...v: any[]): void {
  }
}
