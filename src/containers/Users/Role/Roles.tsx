import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import RoleList from "./RoleList";
import DialogFormUserRole from "../../../components/user/DialogFormUserRole";
import { getUserRolesPath } from "../../../consts/routePaths";
import {
  // FiltersType,
  Role,
  rolesActions,
} from "../../../redux/user/rolesSlice";
import AuthorityApi from "../../../api/AuthorityApi";

function Roles() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const data = useAppSelector((state) => state.UserRoles.data);
  const totalCount = useAppSelector((state) => state.UserRoles.meta.totalCount);
  const filters = useAppSelector((state) => state.UserRoles.filters);

  const [dialogAddEdit, setDialogAddEdit] = useState<Role | {} | undefined>();
  //const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("userRoles");

  const [loading, setLoading] = useState(false);

  const meta = useMemo(
    () => ({
      filters,
      pagination: {
        page,
        rowsPerPage,
      },
    }),
    [filters, page, rowsPerPage]
  );

  useLayoutEffect(() => {
    setLoading(true);
    dispatch(rolesActions.getData(meta)).finally(() => setLoading(false));
  }, [meta]);

  //
  const [authorities, setAuthorities] = useState<any[]>([]);
  useEffect(() => {
    AuthorityApi.getAll().then((response) => setAuthorities(response.data));
  }, []);
  //

  /* const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(rolesActions.setFilters({ ...filters, ...newFilters }));
    history.push(getUserRolesPath(0));
  }; */
  // PAGINATION
  const onChangePage = (newValue: number) => {
    history.push(getUserRolesPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getUserRolesPath(page, newValue));
  };

  /* const handleRoleNewClick = () => {
    let userRole = {
      userRoleId: undefined,
      name: undefined,
      userRoleAuthorityJoined: [],
      userRoleCsdbTypeJoined: [],
    };
    setUserRole(userRole);
    setDialogUserRoleDetailsOpen(true);
  }; */

  /* const handleUserRoleDialogDetailsMultiSelectChange = (event) => {
    let selectedAuthorities = [];
    let lastSelected = event.target.value[event.target.value.length - 1];
    if (lastSelected === "SelectAll") {
      authorities.forEach((authority) => {
        selectedAuthorities.push({
          authority,
        });
      });
    } else if (lastSelected === "DeselectAll") {
      selectedAuthorities = [];
    } else {
      const selectedAuthoritiesIds = event.target.value;
      for (let i = 0, l = selectedAuthoritiesIds.length; i < l; i++) {
        const authorityObject = authorities.find(
          (authority) => authority.authorityId === selectedAuthoritiesIds[i]
        );
        selectedAuthorities.push({
          authority: authorityObject,
        });
      }
    }
    let userRoleClone = cloneDeep(userRole);
    userRoleClone.userRoleAuthorityJoined = selectedAuthorities;
    setUserRole(userRoleClone);
  }; */

  return (
    <>
      <div style={{ fontSize: "1.5rem", color: "red" }}>
        DOES NOT WORK - TODO - TO FIX LATER
      </div>
      <RoleList<Role>
        data={data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) =>
          dispatch(rolesActions.deleteItem({ payload, meta })).then(() =>
            dispatch(rolesActions.getData(meta))
          )
        }
        //
        toolbarProps={{
          onAddClick: setDialogAddEdit,
          title: "form.userRoles",
        }}
        paginationProps={{
          totalCount,
          page,
          rowsPerPage,
          onChangePage,
          onChangeRowsPerPage,
        }}
        loading={loading}
      />

      <DialogFormFrame
        onClose={() => setDialogAddEdit(undefined)}
        title={"userRole.role"}
        open={dialogAddEdit}
      >
        <DialogFormUserRole
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) =>
            dispatch(rolesActions.addEditItem({ payload, meta })).then(() =>
              dispatch(rolesActions.getData(meta))
            )
          }
          authorities={authorities}
        />
      </DialogFormFrame>
    </>
  );
}

export default Roles;
