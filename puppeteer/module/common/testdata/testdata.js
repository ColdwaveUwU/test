class TestData {
    constructor(tester) {
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
        this.paragraphCounter = 0;
        this.listItemCounter = 0;
        this.cellCounter = 0;
    }

    /**
     * Return LOREM_IPSUM data
     */
    LOREM_IPSUM() {
        return this.#sLOREM_IPSUM;
    }

    /**
     * Return ONE_WORD_TEXT data
     */
    ONE_WORD_TEXT() {
        return this.#sONE_WORD_TEXT;
    }

    /**
     * Return PARAGRAPH data
     */
    PARAGRAPH() {
        return this.#sPARAGRAPH;
    }

    /**
     * Return PARAGRAPH data with incremented index
     */
    getParagraphAutoIndex() {
        return this.#sPARAGRAPH + (++this.paragraphCounter);
    }

    /**
     * Return LIST_ITEM data
     */
    LIST_ITEM() {
        return this.#sLIST_ITEM;
    }

    /**
     * Return LIST_ITEM data with incremented index
     */
    getListItemAutoIndex() {
        return this.#sLIST_ITEM + (++this.listItemCounter);
    }

    /**
     * Return CELL data
     */
    CELL() {
        return this.#sCELL;
    }

    /**
     * Return CELL data with incremented index
     */
    getCellAutoIndex() {
        return this.#sCELL + (++this.cellCounter);
    }

    /**
     * Return HEADER data
     */
    HEADER() {
        return this.#sHEADER;
    }

    /**
     * Return FOOTER data
     */
    FOOTER() {
        return this.#sFOOTER;
    }


    #sLOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat faucibus eros, sed mattis tortor consectetur cursus. Mauris non eros odio. Curabitur velit metus, placerat sit amet tempus cursus, pulvinar sed enim. Vivamus odio arcu, volutpat gravida imperdiet vitae, mollis eget augue. Sed ultricies viverra convallis. Fusce pharetra mi eget';
    #sONE_WORD_TEXT = 'SimpleTestText';
    #sPARAGRAPH = 'Paragraph';
    #sLIST_ITEM = 'ListItem';
    #sCELL = 'Cell';
    #sHEADER = 'Header';
    #sFOOTER = 'Footer';
}
module.exports = TestData;
