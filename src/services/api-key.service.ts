import Command from '@oclif/command';
import { readJsonSync } from 'fs-extra';
import { HTTP } from 'http-call';
import { join } from 'path';
import { API_ROUTES } from '../constants/api-routes';
import { USER_CONFIG_TOKEN } from '../constants/tokens';
import { DomainService } from './domain.service';

interface ApiKeyModel {
  key: string;
  id: string;
  organization: { id: string };
}

export class ApiKeyService {
  public static async getAssociatedOrganizationId(apiKey: string) {
    const apiKeysEndpoint = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/${API_ROUTES.API_KEYS_LIST}`;
    const { body: response } = await HTTP.get<{ content: Array<ApiKeyModel> }>(apiKeysEndpoint, { headers: { authorization: `bearer ${apiKey}` } });
    if (!response?.content || response.content.length === 0) {
      return undefined;
    }
    return response.content.find(returnedApiKey => returnedApiKey.key === apiKey)?.organization?.id;

    // hit API Key Endpoint w/ API Key
    // Request URL: https://hub-staging.liquibase.com/api/v1/users/me/api-keys?page=0&size=10&sort=createDate,desc

    // look through list of API Keys for that API Key
    // return Org ID
  }

  public static async getStoredApiKey(requester: Command) {
    const userConfigPath = join(requester.config.configDir, USER_CONFIG_TOKEN);
    const userConfig = readJsonSync(userConfigPath);

    if (!userConfig?.apiKey) {
      requester.error('No API Key was found in your config. Try running `lh auth:login` or `lh auth:status`.');
    }

    // get API key from config
    const apiKey = userConfig.apiKey;

    return apiKey;
  }
}
