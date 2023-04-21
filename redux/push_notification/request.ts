export type SendNotificationPayload = {
  to?: string;
  notification?: Notification
};

type Notification = {
  title?: string;
  body?: string;
}