import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import * as fs from 'fs-extra';
import { ConfigService } from '../../services/config.service';

export default class AuthLogout extends Command {
  static description = 'Remove all stored credentials used in Authentication.'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run() {
    const confirmed = await cli.confirm('Are you sure you want to remove your authentication credentials?')
    if (!confirmed) {
      return this.log('You got it. See ya ✌️!');
    }

    return this.removeStoredApiKey();
  }

  private removeStoredApiKey() {
    cli.action.start('Attempting to store API Key', 'Working...');
    const userConfigPath = ConfigService.getUserConfigPath(this);
    setTimeout(() => {
      fs.mkdirpSync(this.config.configDir);
      fs.removeSync(userConfigPath);
      cli.action.stop('API Key removed successfully!');
    }, 1000);
  }
}
