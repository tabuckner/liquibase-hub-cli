import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import HTTP from 'http-call';
import { prompt } from 'inquirer';
import { API_ROUTES } from '../../constants/api-routes';
import { OrganizationModel } from '../../models/organization.model';
import { PagedResponseModel } from '../../models/paged-response.model';
import { UpdateOrganizationDTO } from '../../models/update-organization.dto';
import { ApiKeyService } from '../../services/api-key.service';
import { DomainService } from '../../services/domain.service';

export default class OrganizationUpdate extends Command {
  static description = 'Updates an Organization.'

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

    const { args, flags } = this.parse(OrganizationUpdate);

    const orgListUrl = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/${API_ROUTES.ORGANIZATIONS_LIST}`;
    const { body: orgsBody } = await HTTP.get<PagedResponseModel<OrganizationModel>>(orgListUrl, { headers: { authorization: `bearer ${apiKey}` } });

    const orgOptions = orgsBody.content.map(org => ({ name: org.name, value: org }));

    // Show list of options
    const responses = await prompt<{ selectedOrganization: OrganizationModel }>([{
      name: 'selectedOrganization',
      message: 'Which Organization do you want to update?',
      type: 'list',
      choices: [...orgOptions],
    }]);

    // onSelect get project ID
    const { selectedOrganization } = responses;

    const nextOrg = await this.getNextOrg(selectedOrganization);
    const updateOrgUrl = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/organizations/${selectedOrganization.id}`;

    const { body } = await HTTP.put(updateOrgUrl, { headers: { authorization: `bearer ${apiKey}` }, body: { ...nextOrg } });
    this.log('\n\n');
    this.log(JSON.stringify(body));
  }

  private async getNextOrg(selectedOrganization: OrganizationModel) {
    const orgName = await cli.prompt('Organization Name', { required: false, default: selectedOrganization.name });
    const orgShortName = await cli.prompt('Organization Short Name', { required: false, default: selectedOrganization.shortName  });
    const orgPrimaryEmail = await cli.prompt('Primary Email', { required: false, default: selectedOrganization.primaryEmailContact  });
    const orgDescription = await cli.prompt('Organization Description', { required: false, default: selectedOrganization.description  });

    const nextOrg: UpdateOrganizationDTO = {
      name: orgName || undefined,
      shortName: orgShortName || undefined,
      primaryEmailContact: orgPrimaryEmail || undefined,
      description: orgDescription || undefined,
    };

    return nextOrg;
  }
}
