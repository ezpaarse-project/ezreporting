export interface ICategory {
  id: string;
  label: string;
  euiIconType?: string;
  order: number;
}

export const PLUGIN_ID: string = `ezreporting`;
export const PLUGIN_NAME: string = 'Reporting';
export const PLUGIN_DESCRIPTION: string = `Manage your reports generated from %APP_NAME%.`;
export const PLUGIN_ICON: string = 'reportingApp';
export const CATEGORY: ICategory = {
  id: `ezreporting_category`,
  label: 'ezReporting',
  euiIconType: '',
  order: 1001,
};
