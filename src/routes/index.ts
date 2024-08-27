import { RouteOptions } from 'fastify';

import UploadController from './Upload';
import ConfirmController from './Confirm';

const routes: RouteOptions[] = [
  UploadController,
  ConfirmController
];

export default routes;