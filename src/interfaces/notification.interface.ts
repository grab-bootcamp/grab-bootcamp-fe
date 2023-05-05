export enum NotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ALERT = 'ALERT'
}

export enum NotificationSeverity {
  MINOR = 'MINOR',
  MODERATE = 'MODERATE',
  CRITICAL = 'CRITICAL'
}

export interface INotification {
  mId: string;
  mTitle: string;
  mBody: string;
  mImage: string | null;
  mType: NotificationType;
  mSeverity: NotificationSeverity;
  mForestId?: string;
  mCreatedAt: Date;
}