export const activityTemplate = {
  settings: {
    number_of_shards: 1,
  },
  mappings: {
    dynamic_templates: [
      {
        strings_as_keywords: {
          match_mapping_type: 'string',
          mapping: {
            type: 'keyword',
          },
        },
      },
    ],
    properties: {
      datetime: {
        type: 'date',
        format: 'epoch_millis',
      },
      action: { type: 'keyword' },
      user: { type: 'keyword' },
      taskId: { type: 'keyword' },
      spaceId: { type: 'keyword' },
      request: {
        properties: {
          method: { type: 'keyword' },
          url: { type: 'keyword' },
          remoteIP: { type: 'keyword' },
          userAgent: { type: 'keyword' },
          query: {
            properties: {
              nostore: { type: 'keyword' },
            },
          },
        },
      },
    },
  },
};
