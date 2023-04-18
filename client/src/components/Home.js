import { Box } from "../styles";
// import Campaign from "./Campaign";

function home() {
  return (
    <div>
      <Box>
        <p>
          Thank you for choosing turn tracker for your in person gaming actor
          tracking needs.
        </p>
      </Box>

      <Box>
      <p>
        This application is designed to be able to add Player Characters and Non
        Player Characters to a list that allows for tracking initiative through
        out your game. The PC tab is where you add your players character names,
        and the NPC tab is for non player characters that you can add for the
        purpose of running/tracking encounters. The tracker page will allow you
        to delete characters as needed, and will then readd them upon starting a
        new combat.
      </p>
      </Box>

      <Box>
      <p>Thanks again!</p>
      </Box>
      {/* <Campaign /> */}
    </div>
  );
}


export default home;
