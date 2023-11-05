import { useState, useEffect } from "react";

import { useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { cloneDeep } from "lodash";

import DialogFormSupportItem from "../../../components/support/DialogFormSupportItem";
import DialogFormSupportCenterFilters from "../../../components/support/DialogFormSupportCenterFilters";
import SupportBugList from "./SupportBugList";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import * as supportActions from "../../../redux/support/supportActions";
import {
  getSupportBugsPath,
  getSupportBugCommentsPath,
} from "../../../consts/routePaths";

function SupportBugs({
  filters,
  page,
  rowsPerPage,
  supportActions,
  supportBugs,
  totalCount,
  modules,
  levels,
  statuses,
}) {
  const [dialogItemOpen, setDialogItemOpen] = useState(false);
  const [dialogFilters, setDialogFilters] = useState();
  const [supportItem, setSupportItem] = useState({});
  const history = useHistory();

  useEffect(() => {
    const viewModel = {
      filters,
      pagination: {
        page,
        rowsPerPage,
      },
    };
    supportActions.loadAll(viewModel);
    supportActions.loadAllModules();
    supportActions.loadAllLevels();
    supportActions.loadAllStatuses();
  }, []);

  const handleChangePage = (e, page) => {
    history.push(getSupportBugsPath(page, rowsPerPage));
  };

  const handleChangeRowsPerPage = (e) => {
    history.push(getSupportBugsPath(page, e.target.value));
  };

  const handleSupportItemClick = (e, id) => {
    //this.setState({dialogItemDetailsOpen: true});
    history.push(getSupportBugCommentsPath(id));
  };

  const handleAddItem = () => {
    if (supportItem.icarusBugId) {
      supportActions.update(supportItem);
    } else {
      supportActions.create(supportItem);
    }
    setDialogItemOpen(false);
  };

  const handleItemClick = () => {
    setDialogItemOpen(true);
  };

  const handleDialogItemClose = () => {
    setSupportItem({});
    setDialogItemOpen(false);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    let supportItemClone = cloneDeep(supportItem);
    supportItemClone[name] = value;
    setSupportItem(supportItemClone);
  };

  const handleSelectChange = (event, name) => {
    let supportItemClone = cloneDeep(supportItem);
    supportItemClone[event.target.name] = {
      [name]: event.target.value,
    };
    setSupportItem(supportItemClone);
  };

  const handleItemDialogClose = () => {
    setDialogItemOpen(false);
  };

  const handleFilterSubmit = (newFilters) => {
    const viewModel = {
      filters: { ...filters, ...newFilters },
      pagination: {
        page,
        rowsPerPage,
      },
    };
    supportActions.loadAll(viewModel);
    supportActions.setFilters({ ...filters, ...newFilters });
  };

  return (
    <>
      <SupportBugList
        data={supportBugs}
        totalCount={totalCount}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onAddClick={handleItemClick}
        onEdit={handleSupportItemClick}
        filters={filters}
        onFilterClick={() => setDialogFilters(filters)}
        page={page}
        rowsPerPage={rowsPerPage}
      />

      <DialogFormFrame
        onClose={handleItemDialogClose}
        disableBackdropClick={true}
        title="support.item"
        open={dialogItemOpen}
      >
        <DialogFormSupportItem
          onClose={handleDialogItemClose}
          onSubmit={handleAddItem}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          modules={modules}
          levels={levels}
          supportItem={supportItem}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogFilters()}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormSupportCenterFilters
          initialData={dialogFilters}
          onClose={() => setDialogFilters()}
          onSubmit={handleFilterSubmit}
          statuses={statuses}
        />
      </DialogFormFrame>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  let page = 0;
  let rowsPerPage = 25;
  if (ownProps.match.params.page) {
    page = parseInt(ownProps.match.params.page);
  }
  if (ownProps.match.params.rowsPerPage) {
    rowsPerPage = parseInt(ownProps.match.params.rowsPerPage);
  }
  return {
    supportBugs: state.SupportCenter.supportBugs,
    totalCount: state.SupportCenter.totalCount,
    modules: state.SupportCenter.modules,
    levels: state.SupportCenter.levels,
    statuses: state.SupportCenter.statuses,
    filters: state.SupportCenter.filters,
    page: page,
    rowsPerPage: rowsPerPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    supportActions: bindActionCreators(supportActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SupportBugs));
