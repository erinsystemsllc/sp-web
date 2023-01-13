import SidebarWithHeader from "./Sidebar";
import Authorization from "../authorization/Authorization";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSearchParams} from "react-router-dom";

const Layout = () => {
  // const [cloudId, setCloudId] = useState("");
  // const [accessToken, setAccessToken] = useState("");
  // const [displayName, setDisplayName] = useState("");
  // const [accountId, setAccountId] = useState("");
  // const grant_type = 'authorization_code';
  // const client_id = 'EDxy4ZFOZibJEkaiw28mF13NnrXcx6AZ';
  // const client_secret = 'ATOAplzrZfJXO27PU2ppvrD4BRiibV_IkouoVQJbP_p25baUZuXYL09AgxnbgMrCdE_i6C507245';
  // const redirect_uri = 'http://localhost:3000/authorization';
  // const baseJiraUrl = 'https://api.atlassian.com/ex/jira/';
  // const [searchParams, setSearchParams] = useSearchParams();
  //
  // const fetchData = () => {
  //   const code = searchParams.get("code");
  //   const data = {grant_type, client_id, client_secret, code, redirect_uri};
  //   axios.post('https://auth.atlassian.com/oauth/token', data).then((response) => {
  //     const token = response.data.access_token;
  //     setAccessToken(token);
  //     const url = 'https://api.atlassian.com/oauth/token/accessible-resources';
  //     const config = {
  //       headers: {Authorization: `Bearer ${token}`}
  //     };
  //     axios.get(url, config).then((response) => {
  //       setCloudId(response.data[0].id);
  //     });
  //   })
  // }
  // const getUser = () => {
  //   const config = {
  //     headers: {Authorization: `Bearer ${accessToken}`}
  //   };
  //   const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/myself';
  //   axios.get(currentUrl, config).then((res) => {
  //     setAccountId(res.data.accountId);
  //     setDisplayName(res.data.displayName);
  //     const accountId = res.data.accountId;
  //     const displayName = res.data.displayName;
  //     const email = res.data.emailAddress;
  //     axios.post('http://localhost:5000/spApi/user', {accountId, displayName, email}).then((res) => {
  //       console.log(res);
  //     });
  //   })
  // }
  //
  // useEffect(() => {
  //   if (cloudId === "") {
  //     fetchData();
  //   }
  // }, [cloudId, fetchData])
  //
  // useEffect(() => {
  //   if (cloudId !== "") {
  //     getUser();
  //   }
  // }, [cloudId, getUser]);
  return (
    <SidebarWithHeader>
      <Authorization/>
    </SidebarWithHeader>
  )
}
export default Layout;
