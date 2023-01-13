import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Authorization = () => {
  const [cloudId, setCloudId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [accountId, setAccountId] = useState("");
  const grant_type = 'authorization_code';
  const client_id = 'EDxy4ZFOZibJEkaiw28mF13NnrXcx6AZ';
  const client_secret = 'ATOAplzrZfJXO27PU2ppvrD4BRiibV_IkouoVQJbP_p25baUZuXYL09AgxnbgMrCdE_i6C507245';
  const redirect_uri = 'http://localhost:3000/authorization';
  const baseJiraUrl = 'https://api.atlassian.com/ex/jira/';

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = () => {
    const code = searchParams.get("code");
    const data = {grant_type, client_id, client_secret, code, redirect_uri};
    axios.post('https://auth.atlassian.com/oauth/token', data).then((response) => {
      const token = response.data.access_token;
      setAccessToken(token);
      const url = 'https://api.atlassian.com/oauth/token/accessible-resources';
      const config = {
        headers: {Authorization: `Bearer ${token}`}
      };
      axios.get(url, config).then((response) => {
        setCloudId(response.data[0].id);
      });
    })
  }

  const getUser = () => {
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };
    const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/myself';
    axios.get(currentUrl, config).then((res) => {
      setAccountId(res.data.accountId);
      const accountId = res.data.accountId;
      const displayName = res.data.displayName;
      const email = res.data.emailAddress;
      axios.post('http://localhost:5000/spApi/user', {accountId, displayName, email}).then((res) => {
        console.log(res);
      });
    })
  }

  const getUserGroups = () => {
    const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/user/groups?accountId=' + accountId;
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };
    axios.get(currentUrl, config).then((res) => {
      console.log(res.data);
    })
  }

  const getPlatformProject = () => {
    const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/project/11529';
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };
    axios.get(currentUrl, config).then((res) => {
      console.log(res.data);
    })
  }

  const getProjects = () => {
    const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/project';
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };
    axios.get(currentUrl, config).then((res) => {
      console.log(res.data);
    })
  }
  const getIssues = () => {
    const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/search?jql=project%20%3D%20EEA%20AND%20Sprint%20%3D%20331%20ORDER%20BY%20created%20DESC';
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
      params: {maxResults: 1000, startAt: 5}
    };
    axios.get(currentUrl, config).then((res) => {
      console.log(res.data);
    })
  }

  const getFields = () => {
    const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/field';
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
    };
    axios.get(currentUrl, config).then((res) => {
      console.log(res.data);
    })
  }

  return (
    <div>
      {/*<div><Button onClick={fetchData}>OAUTH</Button></div>*/}
      {/*<div><Button disabled={cloudId === ''} onClick={getUser}>GetUser</Button></div>*/}
      {/*<div><Button disabled={accountId === ''} onClick={getUserGroups}>GetUserGroups</Button></div>*/}
      {/*<div><Button disabled={accountId === ''} onClick={getPlatformProject}>GetProject</Button></div>*/}
      {/*<div><Button disabled={accountId === ''} onClick={getIssues}>GetDashboards</Button></div>*/}
      {/*<div><Button disabled={accountId === ''} onClick={getFields}>GetFields</Button></div>*/}
      {/*<div><Button disabled={accountId === ''} onClick={getProjects}>GetProjects</Button></div>*/}
    </div>
  )
}

export default Authorization;
