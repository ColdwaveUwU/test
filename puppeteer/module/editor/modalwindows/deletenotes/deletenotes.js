const selectors = require("./selectors.json");
const { Checkbox } = require("../../../elements");
class DeleteNotes {
    constructor(tester, deleteNotesModal) {
        this.tester = tester;
        this.deleteNotesModal = deleteNotesModal;
    }

    static SELECTORS = selectors;

    async deleteAllNotes(footnotes = true, endnotes = true) {
        await this.deleteNotesModal.openModal();
        await Promise.all([
            new Checkbox(this.tester, DeleteNotes.SELECTORS.FOOTNOTE_CHECKBOX).set(footnotes),
            new Checkbox(this.tester, DeleteNotes.SELECTORS.FOOTNOTE_CHECKBOX).set(endnotes),
        ]);
        await this.deleteNotesModal.closeModal();
    }
}

module.exports = DeleteNotes;
