import { Link } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import banner from "../../assets/img/icarus-zlatno-banner.png";
import { auditChecklistOverview } from "../../consts/routePaths";
import { Box } from "@mui/material";

const Logo = ({ open }: { open: any }) => {
  return (
    <Box
      sx={{
        maxHeight: ["48px", "64px"],
      }}
    >
      {open ? (
        <Link to={auditChecklistOverview}>
          <img
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            src={banner}
          />
        </Link>
      ) : (
        <div>
          <h3>
            <Link to={auditChecklistOverview}>
              <Dashboard color="secondary" />
            </Link>
          </h3>
        </div>
      )}
    </Box>
  );
};

export default Logo;
