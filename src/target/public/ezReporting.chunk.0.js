(window["ezReporting_bundle_jsonpfunction"] = window["ezReporting_bundle_jsonpfunction"] || []).push([[0],{

/***/ "./lib/reporting.tsx":
/*!***************************!*\
  !*** ./lib/reporting.tsx ***!
  \***************************/
/*! exports provided: convertFrequency, defaultTask, ms2Str, httpClient, setHttpClient, toasts, setToasts, capabilities, setCapabilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertFrequency", function() { return convertFrequency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTask", function() { return defaultTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ms2Str", function() { return ms2Str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "httpClient", function() { return httpClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHttpClient", function() { return setHttpClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toasts", function() { return toasts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToasts", function() { return setToasts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capabilities", function() { return capabilities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCapabilities", function() { return setCapabilities; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "./common/index.ts");

const convertFrequency = (frequencies, frequency) => {
  const freq = frequencies.find(f => f.value === frequency);
  return freq ? freq.text : 'Error';
};
const defaultTask = dashboardId => ({
  id: '',
  dashboardId: dashboardId || null,
  exists: true,
  reporting: {
    frequency: '1w',
    emails: [],
    createdAt: '',
    print: false
  },
  space: ''
});
const ms2Str = time => {
  let ms = time;
  let s = Math.floor(ms / 1000);
  ms %= 1000;
  let m = Math.floor(s / 60);
  s %= 60;
  const h = Math.floor(m / 60);
  m %= 60;

  if (h) {
    return `${h}h ${m}m`;
  }

  if (m) {
    return `${m}m ${s}s`;
  }

  if (s) {
    return `${s}s`;
  }

  return `${ms}ms`;
};
let httpClient;
function setHttpClient(http) {
  httpClient = http;
}
let toasts;
function setToasts(notifications) {
  toasts = notifications;
}
let capabilities;
function setCapabilities(capa) {
  capabilities = capa[_common__WEBPACK_IMPORTED_MODULE_0__["PLUGIN_ID"]] || {};
}

/***/ }),

/***/ "./public/application.tsx":
/*!********************************!*\
  !*** ./public/application.tsx ***!
  \********************************/
/*! exports provided: mountApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountApp", function() { return mountApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/app */ "./public/components/app.tsx");
/* harmony import */ var _lib_reporting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/reporting */ "./lib/reporting.tsx");





const renderApp = ({
  application,
  notifications,
  http
}, {
  navigation
}, {
  element
}, applicationName, admin) => {
  if (!_lib_reporting__WEBPACK_IMPORTED_MODULE_3__["httpClient"]) {
    Object(_lib_reporting__WEBPACK_IMPORTED_MODULE_3__["setHttpClient"])(http);
  }

  if (!_lib_reporting__WEBPACK_IMPORTED_MODULE_3__["toasts"]) {
    Object(_lib_reporting__WEBPACK_IMPORTED_MODULE_3__["setToasts"])(notifications.toasts);
  }

  if (!_lib_reporting__WEBPACK_IMPORTED_MODULE_3__["capabilities"]) {
    Object(_lib_reporting__WEBPACK_IMPORTED_MODULE_3__["setCapabilities"])(application.capabilities);
  }

  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_app__WEBPACK_IMPORTED_MODULE_2__["EzReportingApp"], {
    basename: http.basePath.get(),
    navigation: navigation,
    applicationName: applicationName,
    admin: admin
  }), element);
  return () => react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(element);
};

async function mountApp({
  coreStart,
  depsStart,
  params,
  applicationName,
  admin
}) {
  return renderApp(coreStart, depsStart, params, applicationName, admin);
}

/***/ }),

/***/ "./public/components/app.tsx":
/*!***********************************!*\
  !*** ./public/components/app.tsx ***!
  \***********************************/
/*! exports provided: EzReportingApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EzReportingApp", function() { return EzReportingApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kbn/i18n/react */ "@kbn/i18n/react");
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @kbn/i18n */ "@kbn/i18n");
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common */ "./common/index.ts");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./table */ "./public/components/table.tsx");
/* harmony import */ var _flyout_edit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./flyout/edit */ "./public/components/flyout/edit.tsx");
/* harmony import */ var _flyout_history__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./flyout/history */ "./public/components/flyout/history.tsx");
/* harmony import */ var _lib_reporting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib/reporting */ "./lib/reporting.tsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class EzReportingApp extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "componentDidMount", () => {
      this.refreshData();
    });

    _defineProperty(this, "polling", async () => {
      const {
        tasks,
        tasksInProgress
      } = this.state;

      if (tasks.length) {
        const tmp = JSON.parse(JSON.stringify(tasksInProgress));
        tasks.forEach(({
          id
        }) => {
          _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["httpClient"].get(`/api/ezreporting/tasks/${id}/history`).then(histories => {
            if (histories.length) {
              const {
                status,
                logs,
                startTime,
                endTime
              } = histories.shift();

              if (status !== 'success') {
                if (new Date(endTime).toISOString() <= new Date().toISOString()) {
                  const log = logs.find(({
                    type
                  }) => type === 'error');
                  tmp[id] = {
                    status,
                    log: log ? log.message : '',
                    startTime,
                    endTime
                  };
                }
              }
            }
          });
          this.setState({
            tasksInProgress: tmp
          });
          this.forceUpdate();
        });
      }

      return new Promise(() => setTimeout(this.polling, this.state.delay));
    });

    _defineProperty(this, "refreshData", () => {
      const {
        admin
      } = this.props;
      _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["httpClient"].get(`/api/ezreporting/tasks${admin ? '/management' : ''}`).then(res => {
        this.setState({
          tasks: res.tasks,
          dashboards: res.dashboards,
          frequencies: res.frequencies,
          spaces: this.props.admin ? res.spaces : []
        });
        this.polling();
      }).catch(err => {
        console.log(err);

        if (err.code === 403) {
          this.setState({
            accessDenied: true
          });
        }

        return _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["toasts"].addDanger({
          title: 'Error',
          text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
            id: "ezReporting.errorOccured",
            defaultMessage: "An error occurred while loading the data."
          })
        });
      });
    });

    _defineProperty(this, "editTaskHandler", task => {
      if (_lib_reporting__WEBPACK_IMPORTED_MODULE_9__["capabilities"].edit) {
        const body = JSON.stringify({
          dashboardId: task.dashboardId,
          frequency: task.reporting.frequency,
          emails: task.reporting.emails,
          print: task.reporting.print,
          space: task.space
        });
        return _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["httpClient"].patch(`/api/ezreporting/tasks/${task.id}`, {
          body
        }).then(() => {
          const index = this.state.tasks.findIndex(({
            id
          }) => id === task.id);
          this.refreshData();
          _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["toasts"].addSuccess({
            title: 'Success',
            text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
              id: "ezReporting.editingSuccess",
              defaultMessage: "Task edited successfully."
            })
          });
          this.closeEditFlyOut();
          this.forceUpdate();
        });
      }
    });

    _defineProperty(this, "closeEditFlyOut", () => {
      Object(_flyout_edit__WEBPACK_IMPORTED_MODULE_7__["closeFlyOut"])();
    });

    _defineProperty(this, "saveTaskHandler", task => {
      if (_lib_reporting__WEBPACK_IMPORTED_MODULE_9__["capabilities"].create) {
        const tasks = this.state.tasks;
        const body = JSON.stringify({
          dashboardId: task.dashboardId,
          frequency: task.reporting.frequency,
          emails: task.reporting.emails,
          print: task.reporting.print,
          space: task.space
        });
        return _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["httpClient"].post('/api/ezreporting/tasks', {
          body
        }).then(res => {
          this.refreshData();
          _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["toasts"].addSuccess({
            title: 'Success',
            text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
              id: "ezreporting.creationSuccess",
              defaultMessage: "Task saved successfully."
            })
          });
          this.closeEditFlyOut();
          this.forceUpdate();
        });
      }
    });

    _defineProperty(this, "downloadManyTask", () => {
      const {
        selectedItems
      } = this.state;

      if (_lib_reporting__WEBPACK_IMPORTED_MODULE_9__["capabilities"].download && selectedItems.length) {
        selectedItems.forEach(({
          id
        }) => {
          _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["httpClient"].get(`/api/ezreporting/tasks/${id}/download`).then(() => {
            _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["toasts"].addSuccess({
              title: 'Success',
              text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
                id: "ezReporting.generated",
                defaultMessage: "Your report will be sent to you by email."
              })
            });
          }).catch(() => {
            _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["toasts"].addDanger({
              title: 'Error',
              text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
                id: "ezReporting.generationError",
                defaultMessage: "An error occurred while generating the report."
              })
            });
          });
        });
      }
    });

    _defineProperty(this, "onChange", selectedSpaces => {
      this.setState({
        selectedSpaces
      });
    });

    _defineProperty(this, "onSelectionChangeHandler", selectedItems => {
      this.setState({
        selectedItems
      });
    });

    _defineProperty(this, "removeManyTasks", () => {
      const {
        selectedItems
      } = this.state;

      if (_lib_reporting__WEBPACK_IMPORTED_MODULE_9__["capabilities"].delete && selectedItems.length) {
        selectedItems.forEach(({
          id
        }) => {
          _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["httpClient"].delete(`/api/ezreporting/tasks/${id}`).then(() => {
            this.refreshData();
            _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["toasts"].addSuccess({
              title: 'Success',
              text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
                id: "ezReporting.removalSuccess",
                defaultMessage: "Task removed successfully."
              })
            });
          }).catch(() => {
            _lib_reporting__WEBPACK_IMPORTED_MODULE_9__["toasts"].addDanger({
              title: 'Error',
              text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
                id: "ezReporting.removalError",
                defaultMessage: "An error occurred during the removal task."
              })
            });
          });
        });
        this.closeDestroyModal();
      }
    });

    _defineProperty(this, "openDestroyModal", () => {
      this.setState({
        showDestroyModal: true
      });
    });

    _defineProperty(this, "closeDestroyModal", () => {
      this.setState({
        showDestroyModal: false
      });
    });

    _defineProperty(this, "closePopover", () => {
      this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(this, "onButtonClick", () => {
      this.setState({
        isPopoverOpen: true
      });
    });

    this.state = {
      tasks: [],
      dashboards: [],
      frequencies: [],
      spaces: [],
      selectedSpaces: [],
      accessDenied: false,
      selectedItems: [],
      showDestroyModal: false,
      isPopoverOpen: false,
      tasksInProgress: {},
      delay: 5000
    };
  }

  render() {
    const {
      basename,
      navigation,
      admin,
      applicationName
    } = this.props;
    const {
      tasks,
      dashboards,
      spaces,
      selectedSpaces,
      accessDenied,
      selectedItems,
      showDestroyModal,
      isPopoverOpen,
      frequencies,
      tasksInProgress
    } = this.state;

    if (accessDenied) {
      const defaultMsg = `
        You are not authorized to access Reporting.
        To use Reporting management, you need the privileges granted by the \`reporting\` role.
      `;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiEmptyPrompt"], {
        iconType: "reportingApp",
        title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
          id: "ezReporting.accessDeniedTitle",
          defaultMessage: "Access denied"
        })),
        body: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
          id: "ezReporting.accessDenied",
          defaultMessage: defaultMsg
        }), ","))
      });
    }

    let createBtn;

    if (_lib_reporting__WEBPACK_IMPORTED_MODULE_9__["capabilities"].create) {
      createBtn = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButton"], {
        fill: true,
        iconType: "plusInCircleFilled",
        isDisabled: dashboards.length > 0 ? false : true,
        onClick: () => dashboards.length > 0 ? Object(_flyout_edit__WEBPACK_IMPORTED_MODULE_7__["openFlyOut"])(null, false) : null
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
        id: "ezreporting.createNewTask",
        defaultMessage: "New reporting task"
      }));
    }

    let reloadBtn;

    if (_lib_reporting__WEBPACK_IMPORTED_MODULE_9__["capabilities"].show) {
      reloadBtn = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButton"], {
        fill: true,
        iconType: "refresh",
        onClick: () => this.refreshData()
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
        id: "ezreporting.reloadTasks",
        defaultMessage: "Reload tasks"
      }));
    }

    let tasksList = tasks;
    let searchBar;
    let spacesList = [];

    if (admin) {
      if (spaces.length > 0) {
        spacesList = spaces.map(space => ({
          value: space.id,
          label: space.name,
          color: space.color
        }));
      }

      const renderOption = (option, searchValue, contentClassName) => {
        const {
          color,
          label,
          value
        } = option;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiHealth"], {
          color: color
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: contentClassName
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiHighlight"], {
          search: searchValue
        }, label)));
      };

      searchBar = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiComboBox"], {
        fullWidth: true,
        options: spacesList,
        selectedOptions: selectedSpaces,
        onChange: this.onChange,
        renderOption: renderOption,
        placeholder: _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.searcg', {
          defaultMessage: 'Search...'
        }),
        isClearable: true,
        "data-test-subj": "spaceSearch"
      });

      if (selectedSpaces.length) {
        const spacesNames = selectedSpaces.map(({
          label
        }) => label);

        if (tasks.length > 0) {
          tasksList = tasks.filter(({
            space
          }) => spacesNames.includes(space));
        }
      }
    }

    let destroyModal;

    if (showDestroyModal) {
      destroyModal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiOverlayMask"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiConfirmModal"], {
        title: _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.questionDeleteTasks', {
          defaultMessage: 'Are you sure you want to delete these tasks ?'
        }),
        onCancel: this.closeDestroyModal,
        onConfirm: this.removeManyTasks,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete tasks",
        buttonColor: "danger",
        defaultFocusedButton: "confirm"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["FormattedMessage"], {
        id: "ezReporting.confirmDeleteTasks",
        defaultMessage: "Are you about to delete the selected tasks."
      })));
    }

    const panels = [{
      id: 0,
      items: [{
        name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.generate', {
          defaultMessage: 'Generate'
        }),
        icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiIcon"], {
          type: "importAction",
          size: "m"
        }),
        onClick: () => {
          this.downloadManyTask();
        }
      }, {
        name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.remove', {
          defaultMessage: 'Delete'
        }),
        icon: 'trash',
        onClick: () => {
          this.openDestroyModal();
        }
      }]
    }];
    const button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButton"], {
      iconType: "arrowDown",
      iconSide: "right",
      onClick: this.onButtonClick
    }, "Manage ", selectedItems.length, " task(s)");
    let popover;

    if (selectedItems.length) {
      popover = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], {
        grow: false
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiPopover"], {
        id: "manageTasks",
        button: button,
        isOpen: isPopoverOpen,
        closePopover: this.closePopover,
        panelPaddingSize: "none",
        anchorPosition: "downLeft"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiContextMenu"], {
        initialPanelId: 0,
        panels: panels
      })));
    }

    const restrictWidth = admin ? 'none' : true;
    const paddingSize = admin ? 'none' : 'l';
    const descriptionHeader = _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.manageYourReportingTasks', {
      defaultMessage: 'Manage your reporting tasks.'
    });
    let pageHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiPageHeader"], {
      restrictWidth: restrictWidth,
      pageTitle: _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.title', {
        defaultMessage: '{name}',
        values: {
          name: `${_common__WEBPACK_IMPORTED_MODULE_5__["PLUGIN_NAME"]} ${applicationName}`
        }
      }),
      rightSideItems: [reloadBtn, createBtn],
      description: admin ? descriptionHeader : null,
      bottomBorder: admin
    });
    let pageHeaderAdmin;

    if (admin) {
      pageHeaderAdmin = pageHeader;
      pageHeader = '';
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], {
      basename: basename
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_flyout_edit__WEBPACK_IMPORTED_MODULE_7__["EzReportingTaskEditFlyout"], {
      dashboards: dashboards,
      frequencies: frequencies,
      spaces: spaces,
      admin: admin,
      editTaskHandler: this.editTaskHandler,
      saveTaskHandler: this.saveTaskHandler
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_flyout_history__WEBPACK_IMPORTED_MODULE_8__["EzReportingHistoryFlyout"], null), destroyModal, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_1__["I18nProvider"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(navigation.ui.TopNavMenu, {
      appName: _common__WEBPACK_IMPORTED_MODULE_5__["PLUGIN_ID"],
      showSearchBar: false
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiPage"], {
      paddingSize: paddingSize
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiPageBody"], null, pageHeader, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiPageContent"], {
      restrictWidth: restrictWidth,
      borderRadius: "none",
      hasShadow: false,
      paddingSize: "none"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiPageContentBody"], {
      restrictWidth: restrictWidth
    }, pageHeaderAdmin, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiSpacer"], {
      size: admin ? 'l' : 's'
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexGroup"], null, popover, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiFlexItem"], null, searchBar)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiSpacer"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_table__WEBPACK_IMPORTED_MODULE_6__["EzReportingTable"], {
      tasks: tasksList,
      tasksInProgress: tasksInProgress,
      spaces: spaces,
      dashboards: dashboards,
      frequencies: frequencies,
      admin: this.props.admin,
      onSelectionChangeHandler: this.onSelectionChangeHandler
    }))))))));
  }

}

/***/ }),

/***/ "./public/components/flyout/edit.tsx":
/*!*******************************************!*\
  !*** ./public/components/flyout/edit.tsx ***!
  \*******************************************/
/*! exports provided: openFlyOut, closeFlyOut, EzReportingTaskEditFlyout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openFlyOut", function() { return openFlyOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeFlyOut", function() { return closeFlyOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EzReportingTaskEditFlyout", function() { return EzReportingTaskEditFlyout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @kbn/i18n/react */ "@kbn/i18n/react");
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @kbn/i18n */ "@kbn/i18n");
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_reporting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/reporting */ "./lib/reporting.tsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







let openFlyOutHandler;
function openFlyOut(task, edit) {
  openFlyOutHandler(task, edit);
}
let closeFlyOutHandler;
function closeFlyOut() {
  closeFlyOutHandler();
}
class EzReportingTaskEditFlyout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "open", (dashboard, edit) => {
      const currentTask = JSON.parse(JSON.stringify(dashboard || Object(_lib_reporting__WEBPACK_IMPORTED_MODULE_5__["defaultTask"])(this.props.dashboards[0].id)));
      const currentFrequency = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(currentTask, 'reporting.frequency');
      const frequency = this.props.frequencies.find(f => f.value === currentFrequency);
      let receivers = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(currentTask, 'reporting.emails', []);

      if (typeof receivers === 'string') {
        receivers = receivers.split(',').map(e => e.trim());
      }

      if (!frequency && this.props.frequencies.length > 0) {
        // If the task frequency doesn't exist anymore, auto-select first frequency
        Object(lodash__WEBPACK_IMPORTED_MODULE_2__["set"])(currentTask, 'reporting.frequency', this.props.frequencies[0].value);
      }

      this.setState({
        isFlyoutVisible: true,
        currentTask,
        edit,
        receivers,
        email: '',
        mailErrorMessages: [],
        dashboardErrorMessages: []
      });
    });

    _defineProperty(this, "close", () => {
      this.setState({
        isFlyoutVisible: false
      });
    });

    _defineProperty(this, "onChangeSpace", selectedSpaces => {
      const currentTask = { ...this.state.currentTask
      };

      if (selectedSpaces.length === 0) {
        currentTask.space = '';
        this.setState({
          currentTask
        });
      }

      if (selectedSpaces.length > 0) {
        currentTask.space = selectedSpaces[0].label;
        this.setState({
          currentTask
        });
      }
    });

    _defineProperty(this, "onChangeDashboard", selectedDashboards => {
      const dashboard = selectedDashboards[0];
      const currentTask = { ...this.state.currentTask
      };
      currentTask.dashboardId = dashboard && dashboard.value;
      const dashboardErrorMessages = [];

      if (!currentTask.dashboardId) {
        dashboardErrorMessages.push(_kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.pleaseSelectDashboard', {
          defaultMessage: 'Please select a dashboard'
        }));
      }

      this.setState({
        currentTask,
        dashboardErrorMessages
      });
    });

    _defineProperty(this, "onChangeFrequency", event => {
      const currentTask = { ...this.state.currentTask
      };
      currentTask.reporting.frequency = event.target.value;
      this.setState({
        currentTask
      });
    });

    _defineProperty(this, "onChangeEmail", event => {
      this.setState({
        email: event.target.value
      });
    });

    _defineProperty(this, "onChangeLayout", event => {
      const currentTask = { ...this.state.currentTask
      };
      currentTask.reporting.print = event.target.checked;
      this.setState({
        currentTask
      });
    });

    _defineProperty(this, "addReceiver", async event => {
      event.preventDefault();
      const {
        email,
        receivers
      } = this.state;
      const emailsList = email.split(',') || [email];
      const wrongEmails = [];

      for (let i = 0; i < emailsList.length; i += 1) {
        try {
          const body = JSON.stringify({
            email: emailsList[i]
          });
          await _lib_reporting__WEBPACK_IMPORTED_MODULE_5__["httpClient"].post('/api/ezreporting/email', {
            body
          });
          const exists = receivers.includes(emailsList[i]);

          if (!exists) {
            receivers.push(emailsList[i]);
          }
        } catch (e) {
          wrongEmails.push(emailsList[i]);
        }
      }

      if (!wrongEmails.length) {
        this.setState({
          email: '',
          mailErrorMessages: [],
          receivers
        });
      }

      if (wrongEmails.length) {
        const mailErrorMessages = wrongEmails.map(emailAddress => {
          return _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.pleaseEnterValidEmail', {
            values: {
              EMAIL_ADDRESS: emailAddress
            },
            defaultMessage: `Please enter a valid email address ({EMAIL_ADDRESS})`
          });
        });
        this.setState({
          mailErrorMessages,
          email: wrongEmails.join(',')
        });
      }
    });

    _defineProperty(this, "removeReceiver", email => {
      this.setState({
        receivers: this.state.receivers.filter(r => r !== email)
      });
    });

    _defineProperty(this, "saveOrUpdate", () => {
      if (_lib_reporting__WEBPACK_IMPORTED_MODULE_5__["capabilities"].create) {
        const {
          edit,
          currentTask,
          receivers
        } = this.state;
        Object(lodash__WEBPACK_IMPORTED_MODULE_2__["set"])(currentTask, 'reporting.emails', receivers);

        if (edit) {
          return this.props.editTaskHandler(currentTask).catch(err => _lib_reporting__WEBPACK_IMPORTED_MODULE_5__["toasts"].addDanger({
            title: 'Error',
            text: Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(err, 'data.error', 'Error')
          }));
        }

        return this.props.saveTaskHandler(currentTask).catch(err => _lib_reporting__WEBPACK_IMPORTED_MODULE_5__["toasts"].addDanger({
          title: 'Error',
          text: Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(err, 'data.error', 'Error')
        }));
      }
    });

    this.state = {
      isFlyoutVisible: false,
      edit: false,
      currentTask: {
        id: '',
        dashboardId: null,
        exists: false,
        reporting: {
          frequency: '',
          emails: [],
          createdAt: '',
          sentAt: '',
          runAt: '',
          print: false
        },
        space: ''
      },
      email: '',
      receivers: [],
      mailErrorMessages: [],
      dashboardErrorMessages: [],
      spaceErrorMessages: []
    };
    openFlyOutHandler = this.open;
    closeFlyOutHandler = this.close;
  }

  render() {
    const {
      isFlyoutVisible,
      currentTask,
      edit,
      mailErrorMessages,
      dashboardErrorMessages,
      spaceErrorMessages,
      receivers
    } = this.state;
    const {
      dashboards,
      frequencies,
      admin,
      spaces
    } = this.props;
    let dashboardList = dashboards.map(dashboard => ({
      value: dashboard.id,
      label: dashboard.name
    }));
    let currentSpaces = [];

    if (admin && currentTask.id.length > 0) {
      currentSpaces = spaces.filter(space => space.name === currentTask.space).map(space => ({
        value: space.id,
        label: space.name,
        color: space.color
      }));
      dashboardList = dashboards.filter(dashboard => dashboard.namespace === currentTask.space).map(dashboard => ({
        value: dashboard.id,
        label: dashboard.name
      }));
    }

    const invalidMail = mailErrorMessages.length > 0;
    const invalidDashboard = dashboardErrorMessages.length > 0;
    const invalidSpace = spaceErrorMessages.length > 0;
    const invalidForm = invalidDashboard || receivers.length === 0;
    let saveBtn;

    if (_lib_reporting__WEBPACK_IMPORTED_MODULE_5__["capabilities"].create) {
      saveBtn = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
        fullWidth: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
        fill: true,
        iconType: "save",
        type: "submit",
        onClick: () => this.saveOrUpdate(),
        disabled: invalidForm,
        fullWidth: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__["FormattedMessage"], {
        id: "ezReporting.save",
        defaultMessage: "Save"
      })));
    }

    if (!isFlyoutVisible) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null);
    }

    let title;

    if (edit) {
      title = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__["FormattedMessage"], {
        id: "ezReporting.editingTask",
        defaultMessage: "Editing a reporting task"
      });
    } else {
      title = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__["FormattedMessage"], {
        id: "ezReporting.creatingTask",
        defaultMessage: "Creating a reporting task"
      });
    }

    const receiverItems = receivers.map((email, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiListGroupItem"], {
      key: index,
      label: email,
      extraAction: {
        iconType: 'trash',
        iconSize: 's',
        'aria-label': `remove receiver ${email}`,
        onClick: () => {
          this.removeReceiver(email);
        }
      }
    }));
    let receiversList;

    if (receiverItems.length > 0) {
      receiversList = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
        fullWidth: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiListGroup"], {
        maxWidth: false,
        bordered: true
      }, receiverItems));
    }

    if (!edit && admin && currentTask.id.length === 0) {
      dashboardList = [];
      currentSpaces = spaces.filter(space => space.name === currentTask.space).map(space => ({
        value: space.id,
        label: space.name,
        color: space.color
      }));
      dashboardList = dashboards.filter(dashboard => dashboard.namespace === currentTask.space).map(dashboard => ({
        value: dashboard.id,
        label: dashboard.name
      }));
    }

    const selectedDashboards = dashboardList.filter(d => d.value === currentTask.dashboardId);
    let spaceSelector;

    if (admin) {
      let spacesList = [];

      if (spaces.length > 0) {
        spacesList = spaces.map(space => ({
          value: space.id,
          label: space.name,
          color: space.color
        }));
      }

      const renderOption = (option, searchValue, contentClassName) => {
        const {
          color,
          label
        } = option;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiHealth"], {
          color: color
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: contentClassName
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiHighlight"], {
          search: searchValue
        }, label)));
      };

      spaceSelector = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
        fullWidth: true,
        label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__["FormattedMessage"], {
          id: "ezReporting.space",
          defaultMessage: "Space"
        }),
        isInvalid: invalidSpace,
        error: spaceErrorMessages
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiComboBox"], {
        fullWidth: true,
        placeholder: _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.selectSpace', {
          defaultMessage: 'Select a space'
        }),
        singleSelection: true,
        options: spacesList,
        selectedOptions: currentSpaces,
        onChange: this.onChangeSpace,
        renderOption: renderOption,
        isClearable: true,
        isInvalid: invalidSpace,
        "data-test-subj": "spaceSearch"
      }));
    }

    const flyOutContent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiForm"], null, spaceSelector, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
      fullWidth: true,
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__["FormattedMessage"], {
        id: "ezReporting.dashboard",
        defaultMessage: "Dashboard"
      }),
      isInvalid: invalidDashboard,
      error: dashboardErrorMessages
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiComboBox"], {
      fullWidth: true,
      placeholder: _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.selectDashboard', {
        defaultMessage: 'Select a dashboard'
      }),
      singleSelection: {
        asPlainText: true
      },
      options: dashboardList,
      selectedOptions: selectedDashboards,
      onChange: this.onChangeDashboard,
      isClearable: true,
      isInvalid: invalidDashboard
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
      fullWidth: true,
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__["FormattedMessage"], {
        id: "ezReporting.frequency",
        defaultMessage: "Frequency"
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSelect"], {
      fullWidth: true,
      options: frequencies,
      value: currentTask.reporting.frequency,
      "aria-label": _kbn_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].translate('ezReporting.frequency', {
        defaultMessage: 'Frequency'
      }),
      onChange: this.onChangeFrequency
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], {
      size: "m"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.addReceiver
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__["FormattedMessage"], {
        id: "ezReporting.receiversEmails",
        defaultMessage: "Receivers' email addresses"
      }),
      fullWidth: true,
      isInvalid: invalidMail,
      error: mailErrorMessages
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFieldText"], {
      fullWidth: true,
      placeholder: "Email",
      value: this.state.email,
      onChange: this.onChangeEmail
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], {
      grow: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
      hasEmptyLabelSpace: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
      iconType: "plusInCircle",
      type: "submit"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__["FormattedMessage"], {
      id: "ezReporting.add",
      defaultMessage: "Add"
    })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiSpacer"], {
      size: "m"
    }), receiversList, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFormRow"], {
      fullWidth: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiCheckbox"], {
      id: "optimize-checkbox",
      checked: currentTask.reporting.print,
      label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_3__["FormattedMessage"], {
        id: "ezReporting.optimizedForPrinting",
        defaultMessage: "Optimized for printing"
      }),
      onChange: this.onChangeLayout
    })), saveBtn);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlyout"], {
      onClose: this.close,
      size: "m",
      "aria-labelledby": "flyoutSmallTitle"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlyoutHeader"], {
      hasBorder: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiTitle"], {
      size: "m"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, title))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlyoutBody"], null, flyOutContent));
  }

}

/***/ }),

/***/ "./public/components/flyout/history.tsx":
/*!**********************************************!*\
  !*** ./public/components/flyout/history.tsx ***!
  \**********************************************/
/*! exports provided: openFlyOut, closeFlyOut, EzReportingHistoryFlyout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openFlyOut", function() { return openFlyOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeFlyOut", function() { return closeFlyOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EzReportingHistoryFlyout", function() { return EzReportingHistoryFlyout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @kbn/i18n/react */ "@kbn/i18n/react");
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @kbn/i18n */ "@kbn/i18n");
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_reporting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../lib/reporting */ "./lib/reporting.tsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






let openFlyOutHandler;
function openFlyOut(dashboard, edit) {
  openFlyOutHandler(dashboard, edit);
}
let closeFlyOutHandler;
function closeFlyOut() {
  closeFlyOutHandler();
}
class EzReportingHistoryFlyout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "showDetails", historyItem => {
      const expandedRows = { ...this.state.expandedRows
      };
      const {
        logs = []
      } = historyItem;
      const columns = [{
        field: 'date',
        name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.date', {
          defaultMessage: 'Date'
        }),
        align: 'left',
        dataType: 'date',
        width: '180px'
      }, {
        field: 'type',
        name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.type', {
          defaultMessage: 'Type'
        }),
        width: '80px',
        render: type => {
          const colors = {
            error: 'danger',
            info: 'primary',
            warn: 'warning'
          };
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiBadge"], {
            color: colors[type] || 'hollow'
          }, type);
        }
      }, {
        field: 'message',
        name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.message', {
          defaultMessage: 'Message'
        }),
        align: 'left'
      }];
      expandedRows[historyItem.id] = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiBasicTable"], {
        items: logs,
        columns: columns
      }));
      this.setState({
        expandedRows
      });
    });

    _defineProperty(this, "hideDetails", historyId => {
      const expandedRows = { ...this.state.expandedRows
      };
      delete expandedRows[historyId];
      this.setState({
        expandedRows
      });
    });

    _defineProperty(this, "toggleDetails", historyItem => {
      const rowsExpanded = { ...this.state.expandedRows
      };

      if (rowsExpanded[historyItem.id]) {
        this.hideDetails(historyItem.id);
      } else {
        this.showDetails(historyItem);
      }
    });

    _defineProperty(this, "refresh", async () => {
      const {
        taskId,
        expandedRows
      } = this.state;
      this.setState({
        refreshing: true
      });
      let historyItems;

      try {
        const resp = await _lib_reporting__WEBPACK_IMPORTED_MODULE_4__["httpClient"].get(`/api/ezreporting/tasks/${taskId}/history`);
        historyItems = resp;
      } catch (e) {
        _lib_reporting__WEBPACK_IMPORTED_MODULE_4__["toasts"].addDanger({
          title: 'Error',
          text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
            id: "ezReporting.historyError",
            defaultMessage: "An error occurred while loading the history."
          })
        });
      }

      historyItems = historyItems || []; // Refresh history logs

      Object.keys(expandedRows).forEach(historyId => {
        const historyItem = historyItems.find(item => item.id === historyId);

        if (historyItem) {
          this.showDetails(historyItem);
        } else {
          this.hideDetails(historyId);
        }
      });
      this.setState({
        refreshing: false,
        historyItems
      });
    });

    _defineProperty(this, "open", async taskId => {
      if (!taskId || !_lib_reporting__WEBPACK_IMPORTED_MODULE_4__["capabilities"].show) {
        return false;
      }

      this.setState({
        taskId,
        historyItems: [],
        isFlyoutVisible: true
      }, this.refresh);
    });

    _defineProperty(this, "close", () => {
      this.setState({
        isFlyoutVisible: false
      });
    });

    _defineProperty(this, "onTableChange", ({
      page = {}
    }) => {
      const {
        index: pageIndex,
        size: pageSize
      } = page;
      this.setState({
        pageIndex,
        pageSize
      });
    });

    this.state = {
      taskId: {},
      refreshing: false,
      isFlyoutVisible: false,
      historyItems: [],
      pageIndex: 0,
      pageSize: 10,
      expandedRows: {}
    };
    openFlyOutHandler = this.open;
    closeFlyOutHandler = this.close;
  }

  render() {
    const {
      refreshing,
      isFlyoutVisible,
      historyItems,
      expandedRows,
      pageIndex,
      pageSize
    } = this.state;

    if (!isFlyoutVisible) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null);
    }

    const columns = [{
      field: 'startTime',
      name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.date', {
        defaultMessage: 'Date'
      }),
      sortable: true,
      dataType: 'date',
      align: 'left'
    }, {
      field: 'status',
      name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.status', {
        defaultMessage: 'Status'
      }),
      sortable: true,
      align: 'left',
      width: '140px',
      render: status => {
        switch (status) {
          case 'error':
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiHealth"], {
              color: "danger"
            }, _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.error', {
              defaultMessage: 'Error'
            }));

          case 'completed':
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiHealth"], {
              color: "success"
            }, _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.completed', {
              defaultMessage: 'Completed'
            }));

          case 'pending':
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiHealth"], {
              color: "primary"
            }, _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.pending', {
              defaultMessage: 'Pending'
            }));

          case 'ongoing':
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiHealth"], {
              color: "primary"
            }, _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.ongoing', {
              defaultMessage: 'Ongoing'
            }));

          default:
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiHealth"], {
              color: "subdued"
            }, _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.unknown', {
              defaultMessage: 'Unknown'
            }));
        }
      }
    }, {
      field: 'executionTime',
      name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_3__["i18n"].translate('ezReporting.executionTime', {
        defaultMessage: 'Execution time'
      }),
      sortable: true,
      align: 'right',
      width: '140px',
      render: executionTime => {
        return Object(_lib_reporting__WEBPACK_IMPORTED_MODULE_4__["ms2Str"])(executionTime);
      }
    }, {
      align: 'right',
      width: '40px',
      isExpander: true,
      render: item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButtonIcon"], {
        onClick: () => this.toggleDetails(item),
        "aria-label": expandedRows[item.id] ? 'Collapse' : 'Expand',
        iconType: expandedRows[item.id] ? 'arrowUp' : 'arrowDown'
      })
    }];
    const pagination = {
      pageIndex,
      pageSize,
      totalItemCount: historyItems.length,
      pageSizeOptions: [10, 20, 30],
      hidePerPageOptions: false
    };
    const startIndex = pageIndex * pageSize;
    const endIndex = Math.min(startIndex + pageSize, historyItems.length);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlyout"], {
      onClose: this.close,
      size: "m",
      "aria-labelledby": "flyoutSmallTitle"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlyoutHeader"], {
      hasBorder: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiTitle"], {
      size: "m"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
      id: "ezReporting.history",
      defaultMessage: "History"
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlyoutBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiBasicTable"], {
      items: historyItems.slice(startIndex, endIndex),
      itemId: "id",
      itemIdToExpandedRowMap: this.state.expandedRows,
      isExpandable: true,
      columns: columns,
      pagination: pagination,
      onChange: this.onTableChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlyoutFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexGroup"], {
      justifyContent: "flexEnd"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiFlexItem"], {
      grow: false
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_1__["EuiButton"], {
      iconType: "refresh",
      onClick: this.refresh,
      isLoading: refreshing,
      fill: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
      id: "ezReporting.refresh",
      defaultMessage: "Refresh"
    }))))));
  }

}

/***/ }),

/***/ "./public/components/table.tsx":
/*!*************************************!*\
  !*** ./public/components/table.tsx ***!
  \*************************************/
/*! exports provided: EzReportingTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EzReportingTable", function() { return EzReportingTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kbn/i18n */ "@kbn/i18n");
/* harmony import */ var _kbn_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @kbn/i18n/react */ "@kbn/i18n/react");
/* harmony import */ var _kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @elastic/eui */ "@elastic/eui");
/* harmony import */ var _elastic_eui__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _flyout_edit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./flyout/edit */ "./public/components/flyout/edit.tsx");
/* harmony import */ var _flyout_history__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./flyout/history */ "./public/components/flyout/history.tsx");
/* harmony import */ var _lib_reporting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/reporting */ "./lib/reporting.tsx");
/* harmony import */ var _public_images_printer_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../public/images/printer.png */ "./public/images/printer.png");
/* harmony import */ var _public_images_printer_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_public_images_printer_png__WEBPACK_IMPORTED_MODULE_8__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class EzReportingTable extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "toggleDetails", item => {
      const itemIdToExpandedRowMap = { ...this.state.itemIdToExpandedRowMap
      };

      if (itemIdToExpandedRowMap[item.id]) {
        delete itemIdToExpandedRowMap[item.id];
        return this.setState({
          itemIdToExpandedRowMap
        });
      }

      const {
        reporting
      } = item;
      const receivers = Array.isArray(reporting.emails) ? reporting.emails.join(', ') : reporting.emails;
      const dsh = this.props.dashboards.find(({
        id,
        namespace
      }) => {
        if (id !== item.dashboardId && namespace !== item.namespace) {
          return false;
        }

        return true;
      });
      const listItems = [{
        title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
          id: "ezReporting.dashboardDescription",
          defaultMessage: "Description"
        }),
        description: dsh.description || 'N/A'
      }, {
        title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
          id: "ezReporting.receiversEmails",
          defaultMessage: "Receivers' email addresses"
        }),
        description: receivers
      }, {
        title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
          id: "ezReporting.nextReport",
          defaultMessage: "Next report"
        }),
        description: reporting.runAt ? moment__WEBPACK_IMPORTED_MODULE_4___default()(reporting.runAt).format('YYYY-MM-DD hh:mm') : 'N/A'
      }, {
        title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
          id: "ezReporting.createdAt",
          defaultMessage: "Creation date"
        }),
        description: reporting.createdAt ? moment__WEBPACK_IMPORTED_MODULE_4___default()(reporting.createdAt).format('YYYY-MM-DD') : 'N/A'
      }];
      itemIdToExpandedRowMap[item.id] = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiDescriptionList"], {
        listItems: listItems
      });
      return this.setState({
        itemIdToExpandedRowMap
      });
    });

    _defineProperty(this, "onTableChange", ({
      page = {},
      sort = {}
    }) => {
      const {
        index: pageIndex,
        size: pageSize
      } = page;
      const {
        field: sortField,
        direction: sortDirection
      } = sort;
      this.setState({
        pageIndex,
        pageSize,
        sortField,
        sortDirection
      });
    });

    this.state = {
      itemIdToExpandedRowMap: {},
      pageIndex: 0,
      pageSize: 10,
      sortField: 'space',
      sortDirection: 'asc',
      tasksInProgress: {}
    };
  }

  render() {
    const {
      pageIndex,
      pageSize,
      itemIdToExpandedRowMap,
      sortField,
      sortDirection
    } = this.state;
    const {
      tasks,
      tasksInProgress,
      spaces,
      dashboards,
      frequencies,
      onSelectionChangeHandler
    } = this.props;
    const actions = [];

    if (_lib_reporting__WEBPACK_IMPORTED_MODULE_7__["capabilities"].edit) {
      actions.push({
        name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.edit', {
          defaultMessage: 'Edit'
        }),
        description: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.edit', {
          defaultMessage: 'Edit'
        }),
        icon: 'pencil',
        type: 'icon',
        color: 'primary',
        onClick: el => {
          if (el.exists) {
            return Object(_flyout_edit__WEBPACK_IMPORTED_MODULE_5__["openFlyOut"])(el, true);
          }

          return _lib_reporting__WEBPACK_IMPORTED_MODULE_7__["toasts"].addDanger({
            title: 'Error',
            text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
              id: "ezReporting.dashboardNotFound",
              values: {
                DASHBOARDid: el.dashboardId
              },
              defaultMessage: "Dashboard nof found or remove (id: {DASHBOARDid})"
            })
          });
        }
      });
    }

    if (_lib_reporting__WEBPACK_IMPORTED_MODULE_7__["capabilities"].edit) {
      actions.push({
        name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.clone', {
          defaultMessage: 'Clone'
        }),
        description: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.clone', {
          defaultMessage: 'Clone'
        }),
        icon: 'copy',
        type: 'icon',
        color: 'primary',
        onClick: el => {
          if (el.exists) {
            return Object(_flyout_edit__WEBPACK_IMPORTED_MODULE_5__["openFlyOut"])(el, false);
          }

          return _lib_reporting__WEBPACK_IMPORTED_MODULE_7__["toasts"].addDanger({
            title: 'Error',
            text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
              id: "ezReporting.dashboardNotFound",
              values: {
                DASHBOARDid: el.dashboardId
              },
              defaultMessage: "Dashboard nof found or remove (id: {DASHBOARDid})"
            })
          });
        }
      });
    }

    if (_lib_reporting__WEBPACK_IMPORTED_MODULE_7__["capabilities"].show) {
      actions.push({
        name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.history', {
          defaultMessage: 'History'
        }),
        description: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.history', {
          defaultMessage: 'History'
        }),
        icon: 'clock',
        type: 'icon',
        color: 'primary',
        onClick: el => {
          if (el.exists) {
            Object(_flyout_history__WEBPACK_IMPORTED_MODULE_6__["openFlyOut"])(el.id, false);
          }
        }
      });
    }

    const columns = [{
      field: 'dashboardId',
      name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.dashboard', {
        defaultMessage: 'Dashboard'
      }),
      description: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.dashboardName', {
        defaultMessage: 'Dashboard name'
      }),
      align: 'left',
      render: (dashboardId, {
        space
      }) => {
        if (dashboardId) {
          const dashboard = dashboards.find(({
            id,
            namespace
          }) => id === dashboardId && namespace === space);

          if (dashboard) {
            let dashboardLink = `/app/kibana#/dashboard/${dashboardId}`;

            if (this.props.admin && dashboard.namespace !== 'default') {
              dashboardLink = `/s/${dashboard.namespace}${dashboardLink}`;
            }

            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiLink"], {
              href: _lib_reporting__WEBPACK_IMPORTED_MODULE_7__["httpClient"].basePath.prepend(dashboardLink)
            }, dashboard.name));
          }
        }

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiTextColor"], {
          color: "warning"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiIcon"], {
          type: "alert"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_kbn_i18n_react__WEBPACK_IMPORTED_MODULE_2__["FormattedMessage"], {
          id: "ezReporting.dashboardNotFound",
          values: {
            DASHBOARDid: dashboardId
          },
          defaultMessage: "Dashboard nof found or remove (id: {DASHBOARDid})"
        }));
      }
    }, {
      field: 'reporting.frequency',
      name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.frequency', {
        defaultMessage: 'Frequency'
      }),
      description: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.frequency', {
        defaultMessage: 'Frequency'
      }),
      render: frequency => Object(_lib_reporting__WEBPACK_IMPORTED_MODULE_7__["convertFrequency"])(frequencies, frequency),
      sortable: true,
      align: 'center'
    }, {
      field: 'reporting.sentAt',
      name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.sentAt', {
        defaultMessage: 'Last sent'
      }),
      description: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.sentAt', {
        defaultMessage: 'Last sent'
      }),
      align: 'center',
      render: sentAt => {
        if (sentAt && sentAt !== '1970-01-01T12:00:00.000Z') {
          return moment__WEBPACK_IMPORTED_MODULE_4___default()(sentAt).format('YYYY-MM-DD');
        }

        return '-';
      }
    }, {
      actions,
      align: 'right',
      width: '32px'
    }, {
      align: 'right',
      width: '40px',
      isExpander: true,
      render: item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiButtonIcon"], {
        onClick: () => this.toggleDetails(item),
        "aria-label": itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand',
        iconType: itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'
      })
    }];
    const hasTaskHistory = Object.keys(tasksInProgress).length > 0;

    if (hasTaskHistory) {
      columns.splice(0, 0, {
        field: 'status',
        name: '',
        width: '28px',
        align: 'center',
        render: (dashboardId, {
          id
        }) => {
          const taskStatus = tasksInProgress[id];

          if (taskStatus) {
            const {
              status,
              log
            } = taskStatus;

            if (status) {
              if (status === 'pending' || status === 'ongoing') {
                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiLoadingSpinner"], {
                  size: "m"
                });
              } else if (status === 'error') {
                return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiToolTip"], {
                  position: "bottom",
                  content: log
                }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiIcon"], {
                  type: "alert"
                }));
              }
            }
          }
        }
      });
    }

    let taskOptimzedForPrinting = [];

    if (tasks.length > 0) {
      taskOptimzedForPrinting = tasks.filter(({
        reporting
      }) => reporting.print);
    }

    if (taskOptimzedForPrinting.length) {
      columns.splice(hasTaskHistory ? 1 : 0, 0, {
        field: 'print',
        name: '',
        width: '28px',
        align: 'center',
        render: (dashboardId, {
          reporting
        }) => {
          if (reporting.print) {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiToolTip"], {
              position: "right",
              content: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.optimizedForPrinting', {
                defaultMessage: 'Optimized for printing'
              })
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiImage"], {
              alt: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.optimizedForPrinting', {
                defaultMessage: 'Optimized for printing'
              }),
              size: 14,
              url: _public_images_printer_png__WEBPACK_IMPORTED_MODULE_8___default.a
            })));
          }
        }
      });
    }

    if (this.props.admin) {
      columns.splice(hasTaskHistory ? 2 : 1, 0, {
        field: 'space',
        name: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.space', {
          defaultMessage: 'Space'
        }),
        description: _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.space', {
          defaultMessage: 'Space'
        }),
        render: space => {
          const currentSpace = spaces.find(({
            name
          }) => name === space);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiBadge"], {
            color: currentSpace && currentSpace.color ? currentSpace.color : 'default'
          }, space || '-');
        },
        sortable: true,
        align: 'center'
      });
    }

    const pagination = {
      pageIndex,
      pageSize,
      totalItemCount: tasks.length,
      pageSizeOptions: [10, 20, 30],
      hidePerPageOptions: false
    };
    const sorting = {
      sort: {
        field: sortField,
        direction: sortDirection
      }
    };
    const startIndex = pageIndex * pageSize;
    const endIndex = Math.min(startIndex + pageSize, tasks.length);
    const selection = {
      selectable: task => task === null || task === void 0 ? void 0 : task.id,
      selectableMessage: selectable => !selectable ? _kbn_i18n__WEBPACK_IMPORTED_MODULE_1__["i18n"].translate('ezReporting.invalidTask', {
        defaultMessage: 'Invalid task'
      }) : undefined,
      onSelectionChange: onSelectionChangeHandler
    };
    const items = tasks.slice(startIndex, endIndex).sort((a, b) => {
      let first = sortField.split('.').reduce((o, i) => o[i], a);
      let second = sortField.split('.').reduce((o, i) => o[i], b);

      if (sortField === 'reporting.frequency') {
        first = Object(_lib_reporting__WEBPACK_IMPORTED_MODULE_7__["convertFrequency"])(frequencies, first);
        second = Object(_lib_reporting__WEBPACK_IMPORTED_MODULE_7__["convertFrequency"])(frequencies, second);
      }

      if (sortDirection === 'asc') {
        return first > second;
      }

      return first < second;
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_elastic_eui__WEBPACK_IMPORTED_MODULE_3__["EuiBasicTable"], {
      items: items,
      itemId: "id",
      itemIdToExpandedRowMap: itemIdToExpandedRowMap,
      isExpandable: true,
      hasActions: true,
      columns: columns,
      pagination: pagination,
      sorting: sorting,
      isSelectable: true,
      selection: selection,
      onChange: this.onTableChange
    });
  }

}

/***/ }),

/***/ "./public/images/printer.png":
/*!***********************************!*\
  !*** ./public/images/printer.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACLUlEQVR4Xu2aXWrCQBDHMzZ+o33TBx9SBF9t4gnsDfQGHsEj2Bt4BG9Qj5BewOizIOTB9yj4gYLpFEI2SKZJWlc3Zf+wbCCa+f+cWdZMAkoMdTodCyddua/ms9nMiAqgRgEYhqG5rqsr9xcRMyGAZVm2ruuKqFLjUGIG/GMA6PIEwFgmV4DFYvHJE6DdbvPMAH9hrBQBSAAJIAEkAAQBWq3WM05THORmtVwugScAeviJwMTRQw+b0AwgPWVelAx0vR/4jQJg5gUEYBBM0Gw2WdnE0Gq14lpC6CeEgC4nlSgbwTJAl5PKykZkABoCNE1zlRRLDSWWABJgCgBjb00McepRANBoNEQjmK7X636QBj1+MAjxMzAO2dzGaQJwqL0hLQAjHP0rgCEFAPV63RVxEXul5HhA9CKu1Wrp3sgul8s/2gckgASQABMAmJAdY/7daToWOz/AaRAKAAAjx3Hsa4BqteofbzYbnt1pOhY775AA2+3WFr0vhB4XlUqFXgNCAzDIcIByuaztdjtbTADmkQRAjUql0mi/39siAqC31+s/dlAsFhO5OxwOoHjC797i8escr2kErukm3QfM3/SFCoXCrR6/6n/ItvkN0KM7c7SOx6Odz+fnt8gADRDdmfPLIZfLaTi9kB/2dDqdQOEo9OFSfdCAB39/iGUmm836Fz2fzxwBksdS4wDwv2dIHitRBjKZDFGY3GEi/T3FvtF+jN6TZYDWQ163wWFEAXwBBdZR2IFYWGkAAAAASUVORK5CYII="

/***/ })

}]);
//# sourceMappingURL=ezReporting.chunk.0.js.map