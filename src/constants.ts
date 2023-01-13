export const AUTH_URL =
  'https://auth.atlassian.com/authorize?' +
  'audience=api.atlassian.com' +
  '&client_id=EDxy4ZFOZibJEkaiw28mF13NnrXcx6AZ' +
  '&scope=offline_access%20read%3Ajira-work%20read%3Ajira-user' +
  '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback' +
  '&state=sppath123&response_type=code' +
  '&prompt=consent';
const USER_API = 'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=EDxy4ZFOZibJEkaiw28mF13NnrXcx6AZ&scope=read%3Ame%20read%3Aaccount&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthorization&state=sppath12345&response_type=code&prompt=consent';
const JIRA_API = 'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=EDxy4ZFOZibJEkaiw28mF13NnrXcx6AZ&scope=read%3Ajira-work%20read%3Ajira-user%20manage%3Ajira-project%20manage%3Ajira-configuration%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthorization&state=sppath12345&response_type=code&prompt=consent';
const GRANULAR_API = 'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=EDxy4ZFOZibJEkaiw28mF13NnrXcx6AZ&scope=read%3Asprint%3Ajira-software%20read%3Aissue%3Ajira-software%20read%3Aepic%3Ajira-software%20read%3Aboard-scope%3Ajira-software%20read%3Auser%3Ajira%20read%3Aproject%3Ajira%20read%3Aproject-role%3Ajira%20read%3Aproject-version%3Ajira%20read%3Aproject.feature%3Ajira%20read%3Aproject-type%3Ajira%20read%3Aavatar%3Ajira%20read%3Agroup%3Ajira%20read%3Aapplication-role%3Ajira&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthorization&state=sppath12345&response_type=code&prompt=consent';
export const AUTH_URL_ONLINE = GRANULAR_API;
