import { Administrator } from "@database";

import { SerializerResponse } from "../../../types";
import {
  FilterRequest,
  PaginatedRequest,
  PaginatedResponse,
} from "../../../utils/utils.types";

export type AdministratorsRequest = PaginatedRequest &
  FilterRequest<Administrator>;

export type AdministratorsResponse = PaginatedResponse<
  SerializerResponse<Administrator>
>;
