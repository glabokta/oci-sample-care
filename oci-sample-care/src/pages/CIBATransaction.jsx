import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Header, Icon, Button, Form } from 'semantic-ui-react';

import config from '../config';

const Transaction = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [messages, setMessages] = useState(null);
  const [authreqid, setAuthreqid] = useState(null);
  const [cibaApproved, setCibaApproved] = useState(false);
  const [cibaCounter, setCibaCounter] = useState(0);
  const [cibaInterval, setCibaInterval] = useState(5000);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
      setAccessToken(null);
    } else {
      setUserInfo(authState.idToken.claims);
      setAccessToken(authState.accessToken.accessToken);
    }
  }, [authState, oktaAuth]);

  useEffect(() => {
    var checkCibaApprovalCtr = 0;
    console.log("Hooked");
    console.log(authreqid);
    console.log(cibaCounter);
    if (cibaCounter > 0){
        //checkCibaApprovalCtr = 3;
        checkCibaApprovalCtr = cibaCounter;

        var i = setInterval(async function(){
          try{
            const isApproved = await checkCibaApproval();
            console.log(checkCibaApprovalCtr);
            console.log(isApproved);
            checkCibaApprovalCtr--;
            if (isApproved)
              setCibaApproved(true);
            if((checkCibaApprovalCtr <= 0) || isApproved) {
                clearInterval(i);
            }
          }catch (err) {
            console.error(err);
            clearInterval(i);
          }  
      }, 5000);
    }
    console.log("Testing");
  }, [authreqid]);

  const checkCibaApproval = async () => {
    try {
      console.log("Checking " + authreqid);

      const result = await fetch(config.cibaTokenUrl, {
        method: 'post',
        headers: {'Accept':'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({"login": userInfo.preferred_username, "auth_req_id": authreqid})
      });
      const response = await result.json();
      console.log(response);

      if ((response.status == 400) && (response.error == "authorization_pending"))
      {
        return false;
      }
      else if (response.status == 200){
        console.log(JSON.stringify(response));
        return true;
      }
      else{
       throw new Error(response.error ?? response.status);
      }
      
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(e.target.amount.value);
      console.log(userInfo);
      const amount = e.target.amount.value;
      
      fetch(config.cibaInitiateUrl, {
        method: 'post',
        headers: {'Accept':'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify({"login": userInfo.preferred_username})
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setAuthreqid(responseJson.auth_req_id);
        setCibaCounter(responseJson.expires_in / responseJson.interval);
        setCibaInterval(responseJson.interval);
      })
      .catch((error) => {
        console.error(error);
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="money" />
          {' '}
          Transfer Money
          {' '}
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input label='Enter amount' name="amount" placeholder='$0' />
          {!authreqid && <Button type='submit' primary>Send</Button>}
        </Form>
        {authreqid
          && (
          <div>
            <p>Waiting for user approval.....</p>    
          </div>
          )}
      </div>
    </div>
  );
};

export default Transaction;
