if (globalThis.Params && globalThis.Params.length > 0) {
    Tester.openFile(globalThis.Params[0]);
    Tester.input(globalThis.Params[1]);
}
Tester.close();
