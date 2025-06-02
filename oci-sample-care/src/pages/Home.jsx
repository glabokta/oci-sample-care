/*
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    await oktaAuth.signInWithRedirect({scopes: ['openid', 'email', 'profile', 'offline_access']});
  };


  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">Profile Management Settings</Header>

        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p>
            Welcome back,&nbsp;
            {userInfo.name}
            !. Visit the
            {' '}
            <a href="/profile">My Profile</a>
            {' '}
            page to take a look inside the ID token.
          </p>
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <p>
            <span>This example shows you how to integrate Okta to your single page React application.</span>
          </p>
          
          <Button id="login-button" primary onClick={login}>Login</Button>



        </div>
        )}
          <h1>Endpoint Privilege Management</h1>
          <p>Enforce least privilege dynamically to prevent malware, ransomware, and identity-based attacks, achieve compliance across Windows, macOS, and Linux endpoints, and enable your zero trust strategy — without compromising on productivity.</p>
          <a href="#" class="cta-button">Request 1:1 Demo</a>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
      </div>
    </div>
  );
};
export default Home;
