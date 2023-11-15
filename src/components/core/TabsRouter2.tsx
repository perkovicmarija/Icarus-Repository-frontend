import {
  Link,
  Route,
  RouteProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { AppBar, Tab, Tabs } from "@mui/material";
import { FormattedMessage } from "react-intl";

export type TabsType = {
  label: string;
  link: string;
  component: RouteProps["component"];
}[];

export const TabsRouter2 = ({ tabs }: { tabs: TabsType }) => {
  const { url } = useRouteMatch();
  console.log(url);
  const { params } = useRouteMatch<{ tab: any }>({ path: url + "/:tab" })!;
  console.log(params);
  const tabSelected = params.tab;

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={tabSelected}
          variant="fullWidth"
          scrollButtons="auto"
          indicatorColor="secondary"
        >
          {tabs.map((item) => (
            <Tab
              key={item.link}
              label={<FormattedMessage id={item.label} />}
              component={Link}
              to={`${url}/${item.link}`}
              value={item.link}
            />
          ))}
        </Tabs>
      </AppBar>
      <Switch>
        {tabs.map((item) => (
          <Route
            key={item.link}
            path={`${url}/${item.link}`}
            component={item.component}
          />
        ))}
      </Switch>
    </>
  );
};
