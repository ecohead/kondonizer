import { LitElement } from 'lit';
import { Notification } from '../types.js';
export default class Notifications extends LitElement {
    static styles: import("lit").CSSResult[];
    notifications: Array<Notification>;
    private _handleClose;
    render(): import("lit").TemplateResult<1>[];
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-notifications': Notifications;
    }
}
