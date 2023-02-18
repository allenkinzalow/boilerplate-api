import { Administrator, User } from "@database";
import { RequestHandler } from "express";

import { SerializerResponse } from "../../../types";
import { filterRequest } from "../../../utils/filtering.utils";
import {
  paginateRequest,
  paginateResponse,
} from "../../../utils/pagination.utils";
import administratorSerializer from "./administrators.serializer";
import {
  AdministratorsRequest,
  AdministratorsResponse,
} from "./administrators.types";

/**
 * GET /api/v1/admin/administrators
 */
const getAdministrators: RequestHandler<
  {},
  AdministratorsResponse,
  AdministratorsRequest
> = async (req, res) => {
  const { count, rows: administrators } = await Administrator.findAndCountAll({
    include: {
      association: Administrator.associations.user,
      attributes: User.serializations.public,
    },
    ...paginateRequest<Administrator>(req.body),
    ...filterRequest<Administrator>(req.body),
  });

  res.status(200).json(
    paginateResponse<SerializerResponse<Administrator>>(
      req.body,
      administrators.map((administrator) =>
        administratorSerializer.serialize(administrator)
      ),
      count
    )
  );
};

export { getAdministrators };
