import { Router } from "express";
import { Request, Response } from 'express';
import { ManagerExistsResponse, Manager, ManagerResponse } from "../models/manager.model";
import { checkEmailExist, createManager } from "../controllers/manager.controller";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";
import { checkTeamExist } from '../controllers/team.controller';

// Create an instance of the Express Router
const router = Router();

// Endpoint to check if a manager with a specific email exists
router.get("/exists/email/:email", (req: Request, res: Response) => {
  // Extract email parameter from the request
  const email = req.params.email;

  // Check if email parameter is missing
  if (!email) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  // Validate email format
  if (!validateEmail(email)) {
    console.log(HttpMsg.INVALID_EMAIL);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
    return;
  }

  try {
    // Check if a manager with the given email exists
    const exists: boolean = checkEmailExist(req.params.email);
    const existsResponse: ManagerExistsResponse = new ManagerExistsResponse(exists);

    res.send(existsResponse);

  } catch (err) {
    console.log(err);
    res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
  }
});

// Endpoint to create a new manager
router.post("/", (req: Request, res: Response) => {
  // Extract manager details from the request body
  const teamId = req.body.teamId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  // Check if any required field is missing
  if (!email || !teamId || !firstName || !lastName || !password) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  // Validate email format
  if (!validateEmail(email)) {
    console.log(HttpMsg.INVALID_EMAIL);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_EMAIL });
    return;
  }

  // Check if the specified team exists
  if (!checkTeamExist(teamId)) {
    console.log(HttpMsg.INVALID_TEAMID);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.INVALID_TEAMID });
    return;
  }

  try {
    // Create a new Manager instance
    const manager: Manager = new Manager(teamId, firstName, lastName, email, password);

    // Create the manager and get the response
    const managerResponse: ManagerResponse = createManager(manager);

    res.send(managerResponse);

  } catch (err) {
    console.log(err);
    res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
  }
});

// Export the router for use in other files
export default router;