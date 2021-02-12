import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import { ApiKeyService } from '../../services/api-key.service';
import HTTP from 'http-call';
import { DomainService } from '../../services/domain.service';
import { API_ROUTES } from '../../constants/api-routes';
import inquirer = require('inquirer');

export default class ProjectDelete extends Command {
  static description = 'Delete a Project for the current Organization.';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    id: flags.string({ char: 'i', description: 'The ID of the Project you wish to delete.' }),
    // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'projectId', required: false, description: 'The ID of the Project you wish to delete.' }]

  async run() {
    const { args, flags } = this.parse(ProjectDelete);

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
      message: 'Which Project do you want to delete?',
      type: 'list',
      choices: [...projectOptions],
    }]);

    // onSelect get project ID
    const { projectId } = responses;

    this.error('Deleting a Project is not yet supported by Liquibase Hub.');
  }
}
