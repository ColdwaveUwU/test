//https://bugzilla.onlyoffice.com/show_bug.cgi?id=74584
Tester.createFile("xlsx");
for (let i = 0; i < 15; i++) {
    Tester.input("Q");
    Tester.keyDown("Tab");
}
Tester.close();
