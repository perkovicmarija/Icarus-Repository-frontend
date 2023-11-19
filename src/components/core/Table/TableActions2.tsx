import Tooltip from "@mui/material/Tooltip";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { FormattedMessage } from "react-intl";
import { SvgIconComponent } from "@mui/icons-material";

export type TableActions2Prop = {
  actions: (IconButtonProps & {
    label: string;
    Icon: SvgIconComponent;
  })[];
};

export const TableActions2 = ({ actions }: TableActions2Prop) => {
  return actions
    .filter((i) => i)
    .map(({ label, Icon, ...props }) => (
      <Tooltip key={label} title={<FormattedMessage id={label} />}>
        <span>
          <IconButton aria-label={label} {...props}>
            <Icon />
          </IconButton>
        </span>
      </Tooltip>
    ));
};
