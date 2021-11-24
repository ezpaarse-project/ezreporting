import { IServerConfig } from "../../common/config";

export let config: IServerConfig;

export function setConfig(internalConfig: IServerConfig) {
  config = internalConfig;

  return config;
}

export function getConfig(): IServerConfig {
  return config;
}