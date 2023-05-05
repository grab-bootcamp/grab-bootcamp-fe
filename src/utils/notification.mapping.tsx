import { FireFilled, InfoCircleTwoTone, WarningFilled } from "@ant-design/icons"
import { NotificationSeverity, NotificationType } from "../interfaces"

export const mapNotificationSeverityToBgColor = {
  [NotificationSeverity.MINOR]: "bg-blue-300 hover:bg-blue-200",
  [NotificationSeverity.MODERATE]: "bg-yellow-500 hover:bg-yellow-400",
  [NotificationSeverity.CRITICAL]: "bg-red-200 hover:bg-red-100",
}

export const mapNotificationTypeToIcon = {
  [NotificationType.INFO]: <InfoCircleTwoTone />,
  [NotificationType.WARNING]: <WarningFilled />,
  [NotificationType.ALERT]: <FireFilled className="text-red-600" />,
}