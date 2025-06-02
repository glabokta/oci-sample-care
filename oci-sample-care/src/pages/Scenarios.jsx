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

import React, { useEffect } from 'react';
import { Header, Icon, Table } from 'semantic-ui-react';

const Scenarios = () => {

  useEffect(() => {
    window.sessionStorage.setItem("noStepUp", "false");
  });

  console.log(process.env.CLIENT_ID);

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="tasks" />
          My Claims
        </Header>
        <h2>Auto & Boat Insurance Claims</h2>

        <table>
          <thead>
              <tr>
                  <th>Claim ID</th>
                  <th>Date of Claim</th>
                  <th>Claim Type</th>
                  <th>Amount Claimed</th>
                  <th>Status</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>0012345</td>
                  <td>2023-07-15</td>
                  <td>Fire Damage</td>
                  <td>$15,000</td>
                  <td>Approved</td>
              </tr>
              <tr>
                  <td>0012346</td>
                  <td>2023-08-02</td>
                  <td>Water Leak</td>
                  <td>$3,500</td>
                  <td>Pending</td>
              </tr>
              <tr>
                  <td>0012347</td>
                  <td>2023-09-10</td>
                  <td>Roof Damage</td>
                  <td>$8,200</td>
                  <td>Under Review</td>
              </tr>
              <tr>
                  <td>0012348</td>
                  <td>2023-10-01</td>
                  <td>Theft</td>
                  <td>$2,000</td>
                  <td>Denied</td>
              </tr>
              <tr>
                  <td>0012349</td>
                  <td>2023-10-15</td>
                  <td>Storm Damage</td>
                  <td>$12,500</td>
                  <td>Approved</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scenarios;
