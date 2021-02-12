import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import cli from 'cli-ux';
import { ApiKeyService } from '../../services/api-key.service';
import HTTP from 'http-call';
import { DomainService } from '../../services/domain.service';
import { API_ROUTES } from '../../constants/api-routes';

export default class ProjectView extends Command {
  static description = 'Open a given Project in your preferred web browser.';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    id: flags.string({ char: 'i', description: 'The ID of the Project you wish to view.' }),
    // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'projectId', required: false, description: 'The ID of the Project you wish to view.' }]

  async run() {
    const { args, flags } = this.parse(ProjectView);

    // get API key from config
    const apiKey = await ApiKeyService.getStoredApiKey(this);

    // convert API key to organization ID
    const organizationId = await ApiKeyService.getAssociatedOrganizationId(apiKey);
    cli.action.start(`Loading projects for ${organizationId}`, 'Loading');
    const projectListUrl = `${DomainService.getDomain()}/${API_ROUTES.V1_URL}/organizations/${organizationId}/projects?sort=createDate,desc`;
    const { body } = await HTTP.get<{ content: Array<any> }>(projectListUrl, { headers: { authorization: `bearer ${apiKey}` } });
    // const projectsList = body.content.map(project => project.name);
    cli.action.stop('\n\n');
    const projectOptions = body.content.map(project => ({ name: project.name, value: project.id }));

    // Show list of options
    const responses = await inquirer.prompt([{
      name: 'projectId',
      message: 'Which Project do you want to view?',
      type: 'list',
      choices: [...projectOptions],
    }]);

    // onSelect get project ID
    const { projectId } = responses;

    // get web app route for Project Details view
    // https://hub-staging.liquibase.com/organizations/b2673e72-2727-49cd-a6aa-2d8655be38ba/projects/44231b1d-10a9-40a7-925f-86a8c01cd370/operations
    const projectDetailsViewRoute = `${DomainService.getDomain()}/organizations/${organizationId}/projects/${projectId}`;

    cli.open(projectDetailsViewRoute);
  }
}
