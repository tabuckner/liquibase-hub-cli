import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import * as fs from 'fs-extra';
import { WEB_APP_ROUTES } from '../../constants/api-routes';
import { ConfigService } from '../../services/config.service';
import { DomainService } from '../../services/domain.service';

/**
 * TODO: Implement a 'real' cognito authentication to go outside of the Hub API Key limitations (scoped to organization).
 * Read More: https://stackoverflow.com/a/51833238
 */
export default class AuthLogin extends Command {
  static description = 'Authenticate the CLI with an API Key generated in Liquibase Hub.'
  private readonly apiKeyEndpoint = `${DomainService.getDomain()}/${WEB_APP_ROUTES.API_KEY}`;

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with no value (-f, --force)
    noOpen: flags.boolean({ char: 'n', description: 'Disables the automatic opening of the API Keys Dashboard page in Liquibase Hub.' }),
  }

  async run() {
    await this.logIntro();
    this.openApiKeysPage();
    const apiKey = await this.getApiKey();
    this.storeApiKeyInConfig(apiKey);
  }

  private storeApiKeyInConfig(apiKey: any) {
    cli.action.start('Attempting to store API Key', 'Working...');
    const userConfigPath = ConfigService.getUserConfigPath(this);
    setTimeout(() => {
      fs.mkdirpSync(this.config.configDir);
      fs.writeJSONSync(userConfigPath, { apiKey });
      cli.action.stop('API Key stored successfully!');
    }, 1000);
  }

  private async getApiKey() {
    const apiKey = await cli.prompt('Paste your API key here', { type: 'mask' });
    return apiKey;
  }

  private openApiKeysPage() {
    const { flags } = this.parse(AuthLogin);

    if (flags.noOpen) {
      return;
    }
    cli.open(this.apiKeyEndpoint);
  }

  private async logIntro() {
    this.log(`In Order to authenticate your LH CLI actions, you will need to be authenticated. \n\nTo do so, let's get an API key generated to authenticate your requests. \nAfter you've generated the API Key, return here to paste the Key.`);
    await cli.anykey(`\nPress Any Key to open API Keys Management page on Liquibase Hub. \n`);
  }
}
