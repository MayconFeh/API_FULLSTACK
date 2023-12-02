class ErrorApp extends Error {
  constructor(public message: string, public codeStatus: number = 400) {
    super(message);
    this.codeStatus = codeStatus;
  }
}

export { ErrorApp }