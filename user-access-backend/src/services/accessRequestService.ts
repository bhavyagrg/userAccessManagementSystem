import { AppDataSource } from "../config/data-source";
import { AccessRequest } from "../entities/AccessRequest";
import { User } from "../entities/User";
import { Software } from "../entities/Software";
import { Status } from "../constants/Status";

const USER_REPO = AppDataSource.getRepository(User);
const SOFTWARE_REPO = AppDataSource.getRepository(Software);
const ACCESS_REQUEST_REPO = AppDataSource.getRepository(AccessRequest);

export const createAccessRequest = async (
  userId: number,
  softwareId: number
) => {
  const user = await USER_REPO.findOneByOrFail({ id: userId });
  const software = await SOFTWARE_REPO.findOneByOrFail({ id: softwareId });

  const request = new AccessRequest();
  request.user = user;
  request.software = software;
  request.status = Status.Pending;

  return ACCESS_REQUEST_REPO.save(request);
};

export const updateRequestStatus = async (
  requestId: number,
  status: string
) => {
  if (!Object.values(Status).includes(status as Status)) {
    throw new Error("Invalid status value");
  }

  const request = await ACCESS_REQUEST_REPO.findOneByOrFail({ id: requestId });
  request.status = status as Status;
  return ACCESS_REQUEST_REPO.save(request);
};

export const getAllRequests = async () => {
  return await ACCESS_REQUEST_REPO.find({
    relations: ["user", "software"], // include related entities if needed
  });
};
