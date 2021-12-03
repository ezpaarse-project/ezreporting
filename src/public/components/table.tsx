import React, { Component, Fragment, createRef } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';
import {
  EuiBasicTable,
  EuiDescriptionList,
  EuiButtonIcon,
  EuiLink,
  EuiTextColor,
  EuiIcon,
  EuiImage,
  EuiToolTip,
  EuiLoadingSpinner,
  EuiBadge,
} from '@elastic/eui';
import moment from 'moment';

import { openFlyOut as openEditFlyOut } from './flyout/edit';
import { openFlyOut as openHistoryFlyOut } from './flyout/history';
import { convertFrequency, toasts, capabilities, httpClient } from '../../lib/reporting';
import printer from '../../public/images/printer.png';
import { IAction } from '../../common/models/action';
import { ITask } from '../../common/models/task';
import { ITableProps, ITableState } from '../../common/models/table';
import { ISpace } from '../../common/models/space';

export class EzReportingTable extends Component<ITableProps, ITableState> {
  private props: ITableProps;
  private state: ITableState;

  constructor(props: ITableProps) {
    super(props);

    this.state = {
      itemIdToExpandedRowMap: {},
      pageIndex: 0,
      pageSize: 10,
      sortField: props.admin ? 'space' : 'dashboardId',
      sortDirection: 'asc',
      tableRef: createRef(),
    };
  }

  toggleDetails = (item): void => {
    const itemIdToExpandedRowMap: object = { ...this.state.itemIdToExpandedRowMap };

    if (itemIdToExpandedRowMap[item.id]) {
      delete itemIdToExpandedRowMap[item.id];
      return this.setState({ itemIdToExpandedRowMap });
    }

    const { reporting } = item;
    const receivers = Array.isArray(reporting.emails)
      ? reporting.emails.join(', ')
      : reporting.emails;

    const dsh = this.props.dashboards.find(({ id, namespace }) => {
      if (id !== item.dashboardId && namespace !== item.namespace) {
        return false;
      }
      return true;
    });

    const listItems: Array<{ title: string, description: string }> = [
      {
        title: (
          <FormattedMessage id="ezReporting.dashboardDescription" defaultMessage="Description" />
        ),
        description: dsh.description || 'N/A',
      },
      {
        title: (
          <FormattedMessage
            id="ezReporting.receiversEmails"
            defaultMessage="Receivers' email addresses"
          />
        ),
        description: receivers,
      },
      {
        title: <FormattedMessage id="ezReporting.nextReport" defaultMessage="Next report" />,
        description: reporting.runAt ? moment(reporting.runAt).format('YYYY-MM-DD hh:mm') : 'N/A',
      },
      {
        title: <FormattedMessage id="ezReporting.createdAt" defaultMessage="Creation date" />,
        description: reporting.createdAt ? moment(reporting.createdAt).format('YYYY-MM-DD') : 'N/A',
      },
    ];
    itemIdToExpandedRowMap[item.id] = <EuiDescriptionList listItems={listItems} />;

    return this.setState({ itemIdToExpandedRowMap });
  };

  onTableChange = ({ page = {}, sort = {} }): void => {
    const { index: pageIndex, size: pageSize } = page;
    const { field: sortField, direction: sortDirection } = sort;

    this.setState({
      pageIndex,
      pageSize,
      sortField,
      sortDirection,
    });
  };

  clearSelection = () => {
    this.state.tableRef.current.setSelection([]);
  };

  render(): string {
    const {
      pageIndex,
      pageSize,
      itemIdToExpandedRowMap,
      sortField,
      sortDirection, 
      tableRef,
    } = this.state;

    const {
      tasks,
      spaces,
      dashboards,
      frequencies,
      onSelectionChangeHandler,
    } = this.props;

    const actions: Array<IAction> = [];

    if (capabilities.edit) {
      actions.push({
        name: i18n.translate('ezReporting.edit', { defaultMessage: 'Edit' }),
        description: i18n.translate('ezReporting.edit', { defaultMessage: 'Edit' }),
        icon: 'pencil',
        type: 'icon',
        color: 'primary',
        onClick: (el): void | string => {
          if (el.exists) {
            return openEditFlyOut(el, true);
          }

          return toasts.addDanger({
            title: 'Error',
            text: (
              <FormattedMessage
                id="ezReporting.dashboardNotFound"
                values={{ DASHBOARD_ID: el.dashboardId }}
                defaultMessage="Dashboard nof found or remove (id: {DASHBOARD_ID})"
              />
            ),
          });
        },
      });
    }

    if (capabilities.edit) {
      actions.push({
        name: i18n.translate('ezReporting.clone', { defaultMessage: 'Clone' }),
        description: i18n.translate('ezReporting.clone', { defaultMessage: 'Clone' }),
        icon: 'copy',
        type: 'icon',
        color: 'primary',
        onClick: (el): void | string => {
          if (el.exists) {
            return openEditFlyOut(el, false);
          }

          return toasts.addDanger({
            title: 'Error',
            text: (
              <FormattedMessage
                id="ezReporting.dashboardNotFound"
                values={{ DASHBOARD_ID: el.DASHBOARD_ID }}
                defaultMessage="Dashboard nof found or remove (id: {DASHBOARD_ID})"
              />
            ),
          });
        },
      });
    }

    if (capabilities.show) {
      actions.push({
        name: i18n.translate('ezReporting.history', { defaultMessage: 'History' }),
        description: i18n.translate('ezReporting.history', { defaultMessage: 'History' }),
        icon: 'clock',
        type: 'icon',
        color: 'primary',
        onClick: (el): void => {
          if (el.exists) {
            openHistoryFlyOut(el.id, false);
          }
        },
      });
    }

    const columns: Array<{
      field?: string;
      name?: string;
      description?: {
        defaultMessage: string;
      },
      align?: string;
      sortable?: boolean;
      width?: string;
      actions?: Array<IAction>;
      isExpander?: boolean;
      render?(el: ITask | string | { id: string }, param?: any): string;
    }> = [
      {
        field: 'status',
        name: '',
        width: '28px',
        align: 'center',
        sortable: true,
        render: (dashboardId: string, { id, history }): string => {
          if (history) {
            const { status, logs } = history;

            if (status) {
              if (status === 'pending' || status === 'ongoing') {
                return (<EuiLoadingSpinner size="m" />)
              } else if (status === 'error' && logs) {
                const error = logs.find(({ type }) => type.toLowerCase() === 'error');
                return (
                  <EuiToolTip position="bottom" content={error.message}>
                    <EuiIcon type="alert" />
                  </EuiToolTip>
                );
              }
            }
          }
        }
      },
      {
        field: 'print',
        name: '',
        width: '28px',
        align: 'center',
        sortable: true,
        render: (dashboardId: string, { reporting }): string => {
          if (reporting.print) {
            return (
              <Fragment>
                {' '}
                <EuiToolTip
                  position="right"
                  content={i18n.translate('ezReporting.optimizedForPrinting', {
                    defaultMessage: 'Optimized for printing',
                  })}
                >
                  <EuiImage
                    alt={i18n.translate('ezReporting.optimizedForPrinting', {
                      defaultMessage: 'Optimized for printing',
                    })}
                    size={14}
                    url={printer}
                  />
                </EuiToolTip>
              </Fragment>
            );
          }
        }
      },
      {
        field: 'dashboardId',
        name: i18n.translate('ezReporting.dashboard', { defaultMessage: 'Dashboard' }),
        description: i18n.translate('ezReporting.dashboardName', {
          defaultMessage: 'Dashboard name',
        }),
        align: 'left',
        sortable: true,
        render: (dashboardId: string, { space }): string => {
          if (dashboardId) {
            const dashboard = dashboards.find(({ id, namespace }) => id === dashboardId && namespace === space);
            if (dashboard) {
              let dashboardLink: string = `/app/kibana#/dashboard/${dashboardId}`;
              if (this.props.admin && dashboard.namespace !== 'default') {
                dashboardLink = `/s/${dashboard.namespace}${dashboardLink}`;
              }

              return (
                <Fragment>
                  <EuiLink href={httpClient.basePath.prepend(dashboardLink)}>
                    {dashboard.name}
                  </EuiLink>
                </Fragment>
              );
            }
          }

          return (
            <EuiTextColor color="warning">
              <EuiIcon type="alert" />
              <FormattedMessage
                id="ezReporting.dashboardNotFound"
                values={{ DASHBOARDid: dashboardId }}
                defaultMessage="Dashboard nof found or remove (id: {DASHBOARDid})"
              />
            </EuiTextColor>
          );
        },
      },{
        field: 'reporting.enabled',
        width: '140px',
        name: i18n.translate('ezReporting.enabled', { defaultMessage: 'Enabled' }),
        description: i18n.translate('ezReporting.enabled', { defaultMessage: 'Enabled' }),
        render: (enabled: boolean): string => {
          if (enabled) {
            return (<EuiIcon type="check" />);
          }
        },
        sortable: true,
        align: 'center',
      },
      {
        field: 'reporting.frequency',
        width: '140px',
        name: i18n.translate('ezReporting.frequency', { defaultMessage: 'Frequency' }),
        description: i18n.translate('ezReporting.frequency', { defaultMessage: 'Frequency' }),
        render: (frequency: string): string => convertFrequency(frequencies, frequency),
        sortable: true,
        align: 'center',
      },
      {
        field: 'reporting.sentAt',
        width: '140px',
        name: i18n.translate('ezReporting.sentAt', { defaultMessage: 'Last sent' }),
        description: i18n.translate('ezReporting.sentAt', { defaultMessage: 'Last sent' }),
        align: 'center',
        sortable: true,
        render: (sentAt: string): string => {
          if (sentAt && sentAt !== '1970-01-01T12:00:00.000Z') {
            return moment(sentAt).format('YYYY-MM-DD');
          }

          return '-';
        },
      },
      {
        actions,
        align: 'right',
        width: '32px',
      },
      {
        align: 'right',
        width: '40px',
        isExpander: true,
        render: (item: { id: string }): string => (
          <EuiButtonIcon
            onClick={() => this.toggleDetails(item)}
            aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
            iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
          />
        ),
      },
    ];

    if (this.props.admin) {
      columns.splice(3, 0, {
        field: 'space',
        width: '200px',
        name: i18n.translate('ezReporting.space', { defaultMessage: 'Space' }),
        description: i18n.translate('ezReporting.space', { defaultMessage: 'Space' }),
        render: (space): string => {
          const currentSpace: ISpace = spaces.find(({ name }) => name === space);
          return <EuiBadge color={(currentSpace && currentSpace.color) ? currentSpace.color : 'default'}>{space || '-'}</EuiBadge>;
        },
        sortable: true,
        align: 'center',
      });
    }

    const pagination: {
      pageIndex: number;
      pageSize: number;
      totalItemCount: number;
      pageSizeOptions: Array<number>,
      hidePerPageOptions: boolean;
    } = {
      pageIndex,
      pageSize,
      totalItemCount: tasks.length,
      pageSizeOptions: [10, 20, 30],
      hidePerPageOptions: false,
    };

    const sorting: {
      sort: {
        field: string;
        direction: string;
      };
    } = {
      sort: {
        field: sortField,
        direction: sortDirection,
      },
    };

    const startIndex: number = pageIndex * pageSize;
    const endIndex: number = Math.min(startIndex + pageSize, tasks.length);

    const selection: {
      selectable(task: ITask): string;
      selectableMessage(selectable: any): string | undefined;
      onSelectionChange(tasksId: Array<string>): void
    } = {
      selectable: (task: ITask) => task?.id,
      selectableMessage: (selectable: any) =>
        !selectable
          ? i18n.translate('ezReporting.invalidTask', { defaultMessage: 'Invalid task' })
          : undefined,
      onSelectionChange: onSelectionChangeHandler,
    };

    const items: Array<ITask> = tasks.slice(startIndex, endIndex).sort((a: ITask, b: ITask): any => {
      let first: string = sortField.split('.').reduce((o, i) => o[i], a);
      let second: string = sortField.split('.').reduce((o, i) => o[i], b);

      if (sortField === 'reporting.frequency') {
        first = convertFrequency(frequencies, first);
        second = convertFrequency(frequencies, second);
      }

      if (sortDirection === 'asc') {
        return first > second;
      }
      return first < second;
    });

    return (
      <Fragment>
        <EuiBasicTable
          items={items}
          itemId="id"
          ref={tableRef}
          itemIdToExpandedRowMap={itemIdToExpandedRowMap}
          isExpandable={true}
          hasActions={true}
          columns={columns}
          pagination={pagination}
          sorting={sorting}
          isSelectable={true}
          selection={selection}
          onChange={this.onTableChange}
        />
       </Fragment>
    );
  }
}
