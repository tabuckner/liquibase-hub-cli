import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import HTTP from 'http-call';
import { API_ROUTES } from '../../constants/api-routes';
import { CreateOrganizationDTO } from '../../models/create-organization.dto';
import { ApiKeyService } from '../../services/api-key.service';
import { DomainService } from '../../services/domain.service';

export default class OrganizationCreate extends Command {
  static description = 'Creates an Organization.'

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

    const { args, flags } = this.parse(OrganizationCreate);

    const nextOrg = await this.getNextOrg();
    const createOrgUrl = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/organizations`;

    const { body } = await HTTP.post(createOrgUrl, { headers: { authorization: `bearer ${apiKey}` }, body: { ...nextOrg } });
    this.log(JSON.stringify(body));
  }

  private async getNextOrg() {
    const orgName = await cli.prompt('Organization Name');
    const orgShortName = await cli.prompt('Organization Short Name');
    const orgPrimaryEmail = await cli.prompt('Primary Email', { required: false });
    const orgDescription = await cli.prompt('Organization Description', { required: false });

    const nextOrg: CreateOrganizationDTO = {
      name: orgName,
      shortName: orgShortName,
      primaryEmailContact: orgPrimaryEmail || undefined,
      description: orgDescription || undefined,
    };

    return nextOrg;
  }
}
