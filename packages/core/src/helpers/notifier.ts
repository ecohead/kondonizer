import { LitElement } from 'lit';
import { NotificationEvent } from '../types.js';

export default class Notifier {
  public static notify(payload: NotificationEvent, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<NotificationEvent>(
        'kondo:notifications:add',
        {
          detail: payload,
          composed: true,
          bubbles: true,
          cancelable: true,
        }
      )
    );
  }
}
