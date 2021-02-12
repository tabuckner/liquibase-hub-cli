import { Command, flags } from '@oclif/command';
import * as fs from 'fs-extra';
import { join } from 'path';
import { USER_CONFIG_TOKEN } from '../../constants/tokens';

export const AUTH_STATUS_FLAGS = {
  help: flags.help({ char: 'h' }),
  // flag with a value (-n, --name=VALUE)
  showKey: flags.boolean({ char: 's', description: 'Enable to show the contents of the API Key.' }),
};

export default class AuthStatus extends Command {
  static description = 'Check the current Authentication Status.'

  static flags = AUTH_STATUS_FLAGS;

  // static args = [{ name: 'file' }];

  async run() {
    const { flags } = this.parse(AuthStatus);

    const userConfigPath = join(this.config.configDir, USER_CONFIG_TOKEN);
    const hasUserConfig = fs.pathExistsSync(userConfigPath);
    if (!hasUserConfig) {
      this.error('No User Config was found. Try `lh auth:login`.');
    }

    this.log('User config found!');
    const userConfig = fs.readJSONSync(userConfigPath);

    if (!userConfig?.apiKey) {
      return this.log('No API Key was found in User Config');
    }

    if (flags.showKey) {
      return this.log(`${userConfig.apiKey} is your active API Key`);
    }

    this.log(`API Key is present. You're good to go!`);
  }
}
