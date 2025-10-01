const { Editing, Collaboration, Proofing, DocContent, Appearance, Workspace } = require("./subsettings");

class AdvancedSettings {
    constructor(tester) {
        this.tester = tester;
    }

    async setSettings(settings) {
        if (settings?.editing) {
            try {
                const editingSettings = new Editing(this.tester);
                await editingSettings.setSettings(settings.editing);
            } catch (err) {
                console.error("Error while applying Editing settings:");
                throw err;
            }
        }

        if (settings?.collab) {
            try {
                const collaborationSettings = new Collaboration(this.tester);
                await collaborationSettings.setSettings(settings.collab);
            } catch (err) {
                console.error("Error while applying Collaboration settings:");
                throw err;
            }
        }

        if (settings?.proofing) {
            try {
                const proofingSettings = new Proofing(this.tester);
                await proofingSettings.setSettings(settings.proofing);
            } catch (err) {
                console.error("Error while applying Proofing settings:");
                throw err;
            }
        }

        if (settings?.docContent) {
            try {
                const docContentSettings = new DocContent(this.tester);
                await docContentSettings.setSettings(settings.docContent);
            } catch (err) {
                console.error("Error while applying DocContent settings:");
                throw err;
            }
        }

        if (settings?.appearance) {
            try {
                const appearanceSettings = new Appearance(this.tester);
                await appearanceSettings.setSettings(settings.appearance);
            } catch (err) {
                console.error("Error while applying Appearance settings:");
                throw err;
            }
        }

        if (settings?.workspace) {
            try {
                const workspaceSettings = new Workspace(this.tester);
                await workspaceSettings.setSettings(settings.workspace);
            } catch (err) {
                console.error("Error while applying Workspace settings:");
                throw err;
            }
        }
    }
}

module.exports = AdvancedSettings;
