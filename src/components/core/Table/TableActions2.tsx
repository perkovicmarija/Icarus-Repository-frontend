import Tooltip from "@mui/material/Tooltip";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { FormattedMessage } from "react-intl";
import { SvgIconComponent } from "@mui/icons-material";

export type TableActions2Prop = {
  actions: {
    label: string;
    Icon: SvgIconComponent;
    onClick: IconButtonProps["onClick"];
  }[];
};

export const TableActions2 = ({ actions }: TableActions2Prop) => {
  return actions
    .filter((i) => i)
    .map(({ label, Icon, onClick }) => (
      <Tooltip key={label} title={<FormattedMessage id={label} />}>
        <div className="d-inline">
          <IconButton aria-label={label} onClick={onClick}>
            <Icon />
          </IconButton>
        </div>
      </Tooltip>
    ));
};
