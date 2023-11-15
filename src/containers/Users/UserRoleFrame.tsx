//
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import Roles from "./Role/Roles";
import Users from "./User/Users";
import { Paper } from "@mui/material";
import { TabsRouter2, TabsType } from "../../components/core/TabsRouter2";

const tabs: TabsType = [
  {
    label: "form.users",
    link: "users",
    component: Users,
  },
  {
    label: "form.roles",
    link: "roles",
    component: Roles,
  },
];

function UserRoleFrame() {
  return (
    <Paper>
      <FormTitleBarRich title="general.userManagement" />
      <TabsRouter2 tabs={tabs} />
    </Paper>
  );
}

export default UserRoleFrame;
