import { forwardRef } from "react";
import { IconButton, IconButtonProps, alpha } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

interface FilterIconCustomProps extends IconButtonProps {
  onFilterClick: IconButtonProps["onClick"];
  filtersActive: boolean;
  style: IconButtonProps["style"];
}

const FilterIconCustom = forwardRef<HTMLButtonElement, FilterIconCustomProps>(
  ({ onFilterClick, filtersActive, style, ...props }, ref) => {
    return (
      <IconButton
        onClick={onFilterClick}
        sx={[
          filtersActive && {
            background: blue[500],
            color: "white",
            "&:hover": {
              background: alpha(blue[500], 0.85),
              color: alpha("#FFF", 0.85),
            },
            ...style,
          },
        ]}
        ref={ref}
        {...props}
      >
        <FilterList />
      </IconButton>
    );
  }
);

export default FilterIconCustom;
