import Command from "@oclif/command";
import { join } from "path";
import { USER_CONFIG_TOKEN } from "../constants/tokens";

export class ConfigService {
  public static getUserConfigPath(requester: Command) {
    return join(requester.config.configDir, USER_CONFIG_TOKEN);
  }
}
