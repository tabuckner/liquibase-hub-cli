import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import { prompt } from 'inquirer';
import { ApiKeyService } from '../../services/api-key.service';
import HTTP from 'http-call';
import { DomainService } from '../../services/domain.service';
import { API_ROUTES } from '../../constants/api-routes';
import { OrganizationModel } from '../../models/organization.model';
import { PagedResponseModel } from '../../models/paged-response.model';

export default class ProjectCreate extends Command {
  static description = 'Create a new Project for the current Organization. All arguments and flags are optional, the CLI will prompt you for what it needs if it is not provided.';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'Name of the New Project' }),
    // flag with no value (-f, --force)
    description: flags.string({ char: 'd', description: 'Description of the New Project' }),
  }

  static args = [
    { name: 'name', required: false },
    { name: 'description', required: false },
  ];

  async run() {
    const { flags } = this.parse(ProjectCreate);

    // get API key from config
    const apiKey = await ApiKeyService.getStoredApiKey(this);

    const orgListUrl = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/${API_ROUTES.ORGANIZATIONS_LIST}`;
    const { body: orgsBody } = await HTTP.get<PagedResponseModel<OrganizationModel>>(orgListUrl, { headers: { authorization: `bearer ${apiKey}` } });

    const orgOptions = orgsBody.content.map(org => ({ name: org.name, value: org }));

    // Show list of options
    const responses = await prompt<{ selectedOrganization: OrganizationModel }>([{
      name: 'selectedOrganization',
      message: 'Under which Organization do you want to place this Project?',
      type: 'list',
      choices: [...orgOptions],
    }]);

    // onSelect get project ID
    const { selectedOrganization } = responses;

    // convert API key to organization ID
    const organizationId = selectedOrganization.id;
    const createProjectUrl = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/organizations/${organizationId}/projects`;

    const projectName = flags.name || await cli.prompt('Project Name');
    const projectDescription = flags.description || await cli.prompt('Project Description');

    const { body } = await HTTP.post<{ content: Array<any> }>(createProjectUrl, { headers: { authorization: `bearer ${apiKey}` }, body: { name: projectName, description: projectDescription } });
  }
}
