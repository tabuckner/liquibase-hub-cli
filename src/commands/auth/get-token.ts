require('dotenv').config();
import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import * as fs from 'fs-extra';
import { AuthorizationCode, ModuleOptions } from 'simple-oauth2';
import { createServer } from 'http';
import { parse } from 'url';
import { WEB_APP_ROUTES } from '../../constants/api-routes';
import { ConfigService } from '../../services/config.service';
import { DomainService } from '../../services/domain.service';
import { readFileSync } from 'fs-extra';
import { join } from 'path';

/**
 * TODO: Implement a 'real' cognito authentication to go outside of the Hub API Key limitations (scoped to organization).
 * Read More: https://stackoverflow.com/a/51833238
 */
export default class AuthGetToken extends Command {
  static description = 'Authenticate the CLI with an API Key generated in Liquibase Hub.'
  private readonly apiKeyEndpoint = `${DomainService.getDomain()}/${WEB_APP_ROUTES.API_KEY}`;
  private readonly authConfig: ModuleOptions = {
    client: {
      id: process.env.CLIENT_ID || '',
      secret: process.env.CLIENT_SECRET || '',
    },
    auth: {
      tokenHost: 'https://liquibasehub.auth.us-east-1.amazoncognito.com',
      // authorizeHost: 'https://liquibasehub.auth.us-east-1.amazoncognito.com/oauth2',
      tokenPath: 'oauth2/token',
      authorizePath: 'oauth2/authorize',
    },
  };
  private client = new AuthorizationCode(this.authConfig);

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with no value (-f, --force)
    noOpen: flags.boolean({ char: 'n', description: 'Disables the automatic opening of the API Keys Dashboard page in Liquibase Hub.' }),
  }

  async run() {
    this.log('Preparing your Authentication flow.');
    const authUrl = this.client.authorizeURL({ redirect_uri: 'http://localhost:1176/callback', scope: ['openid', 'email', 'profile'], state: 'callback' });
    const server = createServer(async (req, res) => {
      if (!req?.url) {
        return cli.error('No Request URL was available while authenticating.');
      }
      const parsedUrl = parse(req.url, true);
      const queryAsObject = parsedUrl.query;
      const authCode = String(queryAsObject.code);

      // this.client.getToken({ code: authCode, redirect_uri: 'http://localhost:1176/callback', scope: ['openid', 'email', 'profile'] }, { json: 'force' }).then(res => console.warn(res)).catch(err => console.error(err))

      try {
        const token = await this.client.getToken({ code: authCode, redirect_uri: 'http://localhost:1176/callback', scope: ['openid', 'email', 'profile'] }, { json: 'force' });
        const accessToken = token.token.access_token;
        // const expiresAt = token.token.expires_at; // TODO: Need to do something with this.
        this.storeApiKeyInConfig(accessToken);
      } catch (error) {
        cli.error('Access Token Error', error);
      }

      cli.action.stop('Auth completed.');
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      const html = readFileSync(join(__dirname, '../../views/auth-successful.html'));
      res.write(html);
      res.end();

      res.connection.end();
      res.connection.destroy();
      server.close();
    }).listen(1176);
    cli.action.start('Taking you to the Liquibase Hub Authentication page', 'Hang Tight');
    setTimeout(() => {
      cli.open(authUrl);
    }, 500);
  }

  private storeApiKeyInConfig(apiKey: string) {
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
}
