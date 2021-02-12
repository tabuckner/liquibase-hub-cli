import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import HTTP from 'http-call';
import { API_ROUTES } from '../../constants/api-routes';
import { OrganizationModel } from '../../models/organization.model';
import { PagedResponseModel } from '../../models/paged-response.model';
import { ApiKeyService } from '../../services/api-key.service';
import { DomainService } from '../../services/domain.service';

export default class OrganizationList extends Command {
  static description = 'Lists your Organizations.'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: 'n', description: 'name to print' }),
    // // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' }),
  }

  // static args = [{ name: 'file' }]

  async run() {
    // get API key from config
    const apiKey = await ApiKeyService.getStoredApiKey(this);

    const { args, flags } = this.parse(OrganizationList);

    cli.action.start(`Loading your Organizations`, 'Loading');
    const orgListUrl = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/${API_ROUTES.ORGANIZATIONS_LIST}`;
    const { body } = await HTTP.get<PagedResponseModel<OrganizationModel>>(orgListUrl, { headers: { authorization: `bearer ${apiKey}` } });
    // const projectsList = body.content.map(project => project.name);
    cli.action.stop('\n\n');
    cli.styledHeader('Organizations');
    cli.table(body.content, { name: { header: 'Project Name' }, shortName: {}, description: {}, id: { header: 'UUID' } }, {});
  }
}
