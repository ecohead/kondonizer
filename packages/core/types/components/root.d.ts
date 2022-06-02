import { LitElement } from "lit";
import './modal.js';
import './preview.js';
export default class Root extends LitElement {
    static styles: import("lit").CSSResult[];
    /**
     * Detect if the main modal should be visible or not.
     *
     * Because we support multiple triggers for a same manager, each one
     * can manually open the selection modal with a proper link to the
     * corresponding input.
     */
    private isOpen;
    private selectedMedias;
    /**
     * Customize the behavior of the component
     *
     * It inherits configuration from the defineConfig helper function, so
     * we can independently customize each instance of the component.
     */
    private config?;
    /**
     * Selected and displayed medias in the preview component.
     *
     * We store here the medias corresponding to the triggered input that are
     * already selected (e.g. via an existing submission) or that have been
     * selected during the modal opening time.
     */
    selectedMediasIds: Array<string | number>;
    activeLang: string;
    connectedCallback(): Promise<void>;
    /** Fired when we click to close the modal. */
    private _closeModal;
    /** Fired when we trigger a queue update. */
    private _updateMediaQueue;
    /**
     * Fired when we click on the 'Confirm' button
     * to save the state in the input.
     */
    private _confirmSelection;
    /** Fired after we delete a media from the sidebar. */
    private _deleteMediaFromServer;
    private _openModal;
    private _updateLanguage;
    private _removeFromPreview;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-root': Root;
    }
}
