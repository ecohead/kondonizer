import { LitElement } from 'lit';
import { NotificationEvent } from '../types.js';
export default class Notifier {
    static notify(payload: NotificationEvent, el: LitElement): void;
}
