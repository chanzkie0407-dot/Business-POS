// ROLES DEFINITION
export const ROLES = {
  CASHIER: 'cashier',
  ADMIN: 'admin',
  SERVICE_PROVIDER: 'sp'
};

// DEFAULT PASSWORDS — change only via allowed roles
export const DEFAULTS = {
  adminPassword: '8888',
  spPassword: '19970407chan'
};

// PERMISSIONS: Sino ang makakapagbago ng password
export const PASSWORD_RULES = {
  [ROLES.CASHIER]: {
    canChange: [],
    canBeChangedBy: [ROLES.ADMIN]
  },
  [ROLES.ADMIN]: {
    canChange: [ROLES.CASHIER],
    canBeChangedBy: [ROLES.SERVICE_PROVIDER]
  },
  [ROLES.SERVICE_PROVIDER]: {
    canChange: [ROLES.ADMIN, ROLES.SERVICE_PROVIDER],
    canBeChangedBy: [ROLES.SERVICE_PROVIDER]
  }
};

// SUBSCRIPTION
export const SUBSCRIPTION = {
  freeDays: 7,
  plans: {
    weekly: { price: 199, days: 7 },
    biweekly: { price: 325, days: 14 },
    monthly: { price: 579, days: 30 }
  }
};

// AUTO-LOGOUT
export const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes
