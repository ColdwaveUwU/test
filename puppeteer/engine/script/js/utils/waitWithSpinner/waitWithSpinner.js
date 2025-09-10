/**
 * @type {string}
 */
const spinnerContainerStyle = `
    position: fixed; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    z-index: 9999; 
    text-align: center;
`;

/**
 * @type {string}
 */
const spinnerStyle = `
    border: 8px solid rgba(243, 243, 243, 0.8); 
    border-top: 8px solid #3498db; 
    border-radius: 50%; 
    width: 10vw; 
    height: 10vw; 
    max-width: 80px; 
    max-height: 80px; 
    animation: spin 1s linear infinite;
`;

/**
 * @type {string}
 */
const textStyle = `
    margin-top: 10px; 
    font-size: 1.5vw; 
    color: #fff; 
    background-color: rgba(0, 0, 0, 0.5); 
    padding: 5px; 
    border-radius: 5px;
`;

/**
 * Displays a spinner on the page while executing the provided callback function.
 * @param {Puppeteer.Page} page - The Puppeteer page object.
 * @param {string} spinnerText - The text to display alongside the spinner.
 * @param {Function} callback - The function to execute while the spinner is displayed. It should return a promise.
 */
async function waitWithSpinner(page, spinnerText, callback) {
    const spinnerHTML = `
        <div id="uploadSpinner" style="${spinnerContainerStyle}">
            <div style="${spinnerStyle}"></div>
            <p style="${textStyle}">[Puppeteer] ${spinnerText}</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;

    try {
        await page.evaluate((html) => {
            document.body.insertAdjacentHTML("beforeend", html);
        }, spinnerHTML);

        return await callback();
    } catch (error) {
        throw error;
    } finally {
        await removeSpinner(page);
    }
}

/**
 * Removes the spinner from the page.
 * @param {Puppeteer.Page} page - The Puppeteer page object.
 */
async function removeSpinner(page) {
    await page.evaluate(() => {
        const spinner = document.getElementById("uploadSpinner");
        if (spinner) {
            spinner.remove();
        }
    });
}

module.exports = waitWithSpinner;
