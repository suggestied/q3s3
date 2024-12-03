export type UserRole = 'operator' | 'technician' | 'owner';

export interface UserPreferences {
  role: UserRole;
  favoriteLocations?: string[];
  favoriteMachines?: string[];
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
    maintenanceAlerts: boolean;
    performanceAlerts: boolean;
    qualityAlerts: boolean;
  };
}