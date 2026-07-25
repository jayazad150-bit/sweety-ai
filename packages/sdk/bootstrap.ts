import { PluginRegistry } from "./registry/PluginRegistry";
import WeatherPlugin from "../../plugins/weather";
import CodingPlugin from "../../plugins/coding";
import BrowserPlugin from "../../plugins/browser";

export async function bootstrapPlugins() {
  const registry = new PluginRegistry();

  registry.register(WeatherPlugin);
  registry.register(CodingPlugin);
  registry.register(BrowserPlugin);

  await WeatherPlugin.activate({ emit: () => {} });
  await CodingPlugin.activate({ emit: () => {} });
  await BrowserPlugin.activate({ emit: () => {} });

  return registry;
}