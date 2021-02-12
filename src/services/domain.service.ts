export class DomainService {
  public static getDomain() {
    const protocol = process.env.DOMAIN_PROTOCOL || 'http://';
    const domainName = process.env.DOMAIN_NAME || 'hub-staging.liquibase.com';
    return `${protocol}${domainName}`;
  }
}
