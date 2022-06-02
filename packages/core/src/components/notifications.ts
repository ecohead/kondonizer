import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import EventEmitter from '../helpers/events.js';
import { useNotificationsStyles } from '../helpers/theme.js';
import { Notification } from '../types.js';

@customElement('kondo-notifications')
export default class Notifications extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = useNotificationsStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  @property({
    type: Array
  })
  notifications: Array<Notification> = [];

  // -----------------------------------------------------------------------
  // UI handlers.
  // -----------------------------------------------------------------------

  private _handleClose(notification: Notification) {
    EventEmitter.removeNotification(notification.uuid, this);
  }

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    return this.notifications.map(
      (notification: Notification) => {
        setTimeout(() => this._handleClose(notification), 3000);
        return html`
          <button class="kondoNotification --${notification.type}" @click=${() => this._handleClose(notification)}>
            <span>${notification.message}</span>
          </button>
        `
      }
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-notifications': Notifications;
  }
}
