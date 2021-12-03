export const reportingTemplate = {
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
      dashboardId: {
        type: 'keyword',
      },
      space: {
        type: 'keyword',
      },
      emails: {
        type: 'keyword',
      },
      frequency: {
        type: 'keyword',
      },
      print: {
        type: 'boolean',
      },
      enabled: {
        type: 'boolean',
      },
      image: {
        type: 'boolean',
      },
      createdAt: {
        type: 'date',
      },
      updatedAt: {
        type: 'date',
      },
      sentAt: {
        type: 'date',
      },
    },
  },
};
