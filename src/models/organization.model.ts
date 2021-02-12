export interface OrganizationModel {
  id: string;
  name: string;
  shortName: string;
  primaryEmailContact: string;
  description: string;
  // type: OrganizationTypes;
  type: string;
  // hubUsers?: Array<UserModel>;
  hubUsers?: Array<any>;
}
