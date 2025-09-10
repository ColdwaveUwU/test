async function authorizeUser(page, userObject, passwordObject, confirmSelector) {
    const { userName, userNameSelector } = userObject;
    const { password, passwordSelector } = passwordObject;
    await Promise.all([page.waitForSelector(userNameSelector), page.waitForSelector(passwordSelector)]);
    await page.type(userNameSelector, userName);
    await page.type(passwordSelector, password);
    await page.click(confirmSelector);
}
module.exports = { authorizeUser };
