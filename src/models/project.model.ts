import { OrganizationModel } from "./organization.model";

export interface ProjectModel {
  id: string;
  name: string;
  organization: OrganizationModel;
  createDate: string;
  removeDate: string;
  description?: string;
}
