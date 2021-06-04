/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Knex from 'knex';

export type Database = Knex;

function getConnectionHost(): string {
  const {DB_SOCKET_PATH, DB_INSTANCE_CONNECTION_NAME} = process.env;
  if (DB_SOCKET_PATH && DB_INSTANCE_CONNECTION_NAME) {
    return `${DB_SOCKET_PATH}/${DB_INSTANCE_CONNECTION_NAME}`;
  }

  // localhost is used if host is not provided.
  return '127.0.0.1';
}

export function dbConnect(): Database {
  return Knex({
    client: 'pg',
    connection: {
      host: getConnectionHost(),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });
}
