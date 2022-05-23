import { schema, TypeOf } from '@kbn/config-schema';
export interface IServerConfig {
  applicationName: string;
  appUrl: string;
  frequencies: Array<object>;
  cron: string;
  puppeteerTimeout: number;
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    ignoreTLS: boolean;
    tls: {
      rejectUnauthorized: boolean;
    };
  };
  email: {
    attempts: number;
    interval: number;
    template: {
      color: string;
      backgroundColor: string;
    },
  };
  network: {
    twitter: string;
    email: string;
    github: string;
    youtube: string;
  };
  contact: string;
  sender: string;
  index: string;
  historyIndex: string;
  activityIndex: string;
  roleName: string;
  elastic: {
    baseUrl: string;
    username: string;
    password: string;
  };
  kibana: {
    inernal: string;
    external: string;
  };
  logos: Array<object>;
  webSocketPort: number;
}

export const configSchema = schema.object({
  applicationName: schema.string({
    defaultValue: process.env.EZREPORTING_APPLICATION_NAME || 'ezReporting',
  }),
  appUrl: schema.string({
    defaultValue: process.env.EZREPORTING_APPLICATION_URL || 'http://localhost:5601/kibana',
  }),
  frequencies: schema.arrayOf(schema.object({
    fr: schema.string(),
    text: schema.string(),
    value: schema.string(),
  }), {
    defaultValue: process.env.EZREPORTING_FREQUENCIES || [
      { fr: 'Hebdomadaire', text: 'Weekly', value: '1w' },
      { fr: 'Mensuel', text: 'Monthly', value: '1M' },
      { fr: 'Trimestriel', text: 'Quarterly', value: 'quarterly' },
      { fr: 'Semestriel', text: 'Semi-annual', value: 'semiannual' },
      { fr: 'Annuel', text: 'Annual', value: '1y' }
    ],
  }),
  cron: schema.string({
    defaultValue: process.env.EZREPORTING_CRON || '0 0 1 * * *',
  }),
  puppeteerTimeout: schema.number({
    defaultValue: process.env.EZREPORTING_PUPPETEER_TIMEOUT || 60000,
  }),
  smtp: schema.object({
    host: schema.string({ defaultValue: 'localhost' }),
    port: schema.number({ defaultValue: 25 }),
    secure: schema.boolean({ defaultValue: false }),
    ignoreTLS: schema.boolean({ defaultValue: false }),
    tls: schema.object({
      rejectUnauthorized: schema.boolean({ defaultValue: false }),
    }),
    auth: schema.object({
      user: schema.string({ defaultValue: null }),
      pass: schema.string({ defaultValue: null }),
    }),
  }, {
    defaultValue: {
      host: process.env.EZREPORTING_SMTP_HOST || 'localhost',
      port: process.env.EZREPORTING_SMTP_PORT || 25,
      secure: process.env.EZREPORTING_SMTP_SECURE || false,
      ignoreTLS: process.env.EZREPORTING_SMTP_IGNORE_TLS || false,
      tls: {
        rejectUnauthorized: process.env.EZREPORTING_SMTP_REJECT_UNAUTHORIZED || false,
      },
      auth: {
        user: process.env.EZREPORTING_SMTP_AUTH_USER,
        pass: process.env.EZREPORTING_SMTP_AUTH_PASSWORD,
      },
    },
  }),
  email: schema.object({
    attempts: schema.number({ defaultValue: 5 }),
    interval: schema.number({ defaultValue: 2000 }),
    template: schema.object({
      color: schema.string({ defaultValue: '#2980b9' }),
      backgroundColor: schema.string({ defaultValue: '#f7f7f7' }),
    }),
  }, {
    defaultValue: {
      attempts: process.env.EZREPORTING_EMAIL_ATTEMPTS || 5,
      interval: process.env.EZREPORTING_EMAIL_INTERVAL || 2000,
      template: {
        color: process.env.EZREPORTING_EMAIL_COLOR || '#2980b9',
        backgroundColor: process.env.EZREPORTING_EMAIL_BACKGROUND_COLOR || '#f7f7f7',
      }
    },
  }),
  network: schema.object({
    twitter: schema.string({ defaultValue: null }),
    github: schema.string({ defaultValue: null }),
    youtube: schema.string({ defaultValue: null }),
  }, {
    defaultValue: {
      twitter: process.env.EZREPORTING_TWITTER || null,
      github: process.env.EZREPORTING_GITHUB || null,
      youtube: process.env.EZREPORTING_YOUTUBE || null,
    },
  }),
  contact: schema.string({
    defaultValue: process.env.EZREPORTING_EMAIL_CONTACT || 'reporting@ezreporting.org',
  }),
  sender: schema.string({
    defaultValue: process.env.EZREPORTING_EMAIL_SENDER || 'reporting@ezreporting.org',
  }),
  index: schema.string({
    defaultValue: process.env.EZREPORTING_INDEX || '.ezreporting',
  }),
  historyIndex: schema.string({
    defaultValue: process.env.EZREPORTING_HISTORY_INDEX || '.ezreporting-history',
  }),
  activityIndex: schema.string({
    defaultValue: process.env.EZREPORTING_ACTIVITY_INDEX || '.ezreporting-activity',
  }),
  roleName: schema.string({
    defaultValue: process.env.EZREPORTING_ROLE_NAME || 'ezreporting',
  }),
  elastic: schema.object({
    baseUrl: schema.string({ defaultValue: 'http://elastic:9200' }),
    username: schema.string({ defaultValue: 'elastic' }),
    password: schema.number({ defaultValue: 'changeme' }),
  }, {
    defaultValue: {
      baseUrl: process.env.ELASTICSEARCH_BASE_URL || 'http://elastic:9200',
      username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
      password: process.env.ELASTICSEARCH_PASSWORD || 'changeme',
    },
  }),
  kibana: schema.object({
    internal: schema.string({ defaultValue: 'http://localhost:5601/kibana' }),
    external: schema.number({ defaultValue: 'http://localhost:5601/kibana' }),
  }, {
    defaultValue: {
      internal: process.env.EZREPORTING_KIBANA_INTERNAL_URL || 'http://localhost:5601/kibana',
      external: process.env.EZREPORTING_KIBANA_EXTERNAL_URL || 'http://localhost:5601/kibana',
    },
  }),
  logos: schema.arrayOf(schema.object({
    file: schema.string(),
    link: schema.string(),
  }), {
    defaultValue: process.env.EZREPORTING_LOGOS || [
      { file: 'images/logo.png', link: 'kibana' }
    ],
  }),
  webSocketPort: schema.number({
    defaultValue: process.env.EZREPORTING_WEB_SOCKET_PORT || 3000,
  }),
});

export type ConfigSchema = TypeOf<typeof configSchema>;
