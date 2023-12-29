import { Router } from "express";
import { Request, Response } from 'express';
import {
  checkTeamExist,
  checkTeamEmailExist,
  createTeam
} from '../controllers/team.controller';
import {
  TeamIdExistsResponse,
  TeamManagerInterface,
  TeamIdEmailExistsResponse,
  Team
} from "../models/team.model";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import { validateEmail } from "../utils/utils";

// Create an instance of the Express Router
const router = Router();

// Endpoint to validate if a Team ID exists
router.get("/exists/teamId/:id", (req: Request, res: Response) => {
  // Check if the Team ID parameter is missing
  if (!req.params.id) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  try {
    // Check if the Team ID exists
    const exists: boolean = checkTeamExist(req.params.id);
    const existsResponse: TeamIdExistsResponse = new TeamIdExistsResponse(exists);

    res.send(existsResponse);

  } catch (err) {
    console.log(err);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
  }
});

// Endpoint to validate both Team ID and email existence
router.get("/exists", (req: Request<{}, {}, {}, TeamManagerInterface>, res: Response) => {
  // Extract Team ID and email from query parameters
  const teamId = req.query.teamId;
  const email = req.query.email;

  // Check if either Team ID or email is missing
  if (!teamId || !email) {
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
    // Check if Team ID and email combination exists
    const teamIdEmailExistResponse: TeamIdEmailExistsResponse = checkTeamEmailExist(teamId, email);

    res.send(teamIdEmailExistResponse);

  } catch (err) {
    console.log(err);
    res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
  }

});

// Endpoint to create a Team
router.post("/", (req: Request, res: Response) => {
  // Extract Team ID and Team Name from the request body
  const teamId = req.body.teamId;
  const teamName = req.body.teamName;

  // Check if either Team ID or Team Name is missing
  if (!teamId || !teamName) {
    console.log(HttpMsg.BAD_REQUEST);
    res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    return;
  }

  try {
    // Create a new Team instance
    const team: Team = new Team(teamId, teamName);

    // Create the Team and get the response
    const TeamResponse: Team = createTeam(team);

    res.send(TeamResponse);

  } catch (err) {
    console.log(err);
    res.status(HttpCode.BAD_REQUEST).send(HttpMsg.BAD_REQUEST);
  }

});

// Export the router for use in other files
export default router;