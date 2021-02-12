import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import { ApiKeyService } from '../../services/api-key.service';
import HTTP from 'http-call';
import { prompt } from 'inquirer';
import { DomainService } from '../../services/domain.service';
import { API_ROUTES } from '../../constants/api-routes';
import { PagedResponseModel } from '../../models/paged-response.model';
import { OrganizationModel } from '../../models/organization.model';

export default class ProjectList extends Command {
  static description = 'Lists Projects available for current Organization.';

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  // static args = [{ name: 'file' }]

  async run() {
    // get API key from config
    const apiKey = await ApiKeyService.getStoredApiKey(this);

    // convert API key to organization ID
    const orgListUrl = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/${API_ROUTES.ORGANIZATIONS_LIST}`;
    const { body: orgsBody } = await HTTP.get<PagedResponseModel<OrganizationModel>>(orgListUrl, { headers: { authorization: `bearer ${apiKey}` } });

    const orgOptions = orgsBody.content.map(org => ({ name: org.name, value: org }));

    // Show list of options
    const responses = await prompt<{ selectedOrganization: OrganizationModel }>([{
      name: 'selectedOrganization',
      message: 'Which Organization do you to see the Projects for?',
      type: 'list',
      choices: [...orgOptions],
    }]);

    // onSelect get project ID
    const { selectedOrganization } = responses;
    // const organizationId = await ApiKeyService.getAssociatedOrganizationId(apiKey);
    // const organizationId = `4047e631-e034-4f52-b45c-797e1167fda2`;
    cli.action.start(`Loading Projects for ${selectedOrganization.name}`, 'Loading');
    const projectListUrl = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/organizations/${selectedOrganization.id}/projects?sort=createDate,desc`;
    const { body } = await HTTP.get<{ content: Array<any> }>(projectListUrl, { headers: { authorization: `bearer ${apiKey}` } });
    // const projectsList = body.content.map(project => project.name);
    cli.action.stop('\n\n');
    cli.styledHeader('Projects');
    cli.table(body.content, { name: { header: 'Project Name' }, description: {}, id: { header: 'UUID' } }, {});
    // make request to Request URL: https://hub-staging.liquibase.com/api/v1/organizations/{orgId}/projects?sort=createDate,desc

    // Request URL: https://hub-staging.liquibase.com/api/v1/organizations/b2673e72-2727-49cd-a6aa-2d8655be38ba/projects?sort=createDate,desc
  }
}
