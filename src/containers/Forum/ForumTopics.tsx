import ForumTopicsList from "../../components/forum/ForumTopicsList";
import {
    ForumTopic,
    useDeleteForumTopicMutation,
    useGetForumTopicsPaginatedQuery
} from "../../redux/forum/forumTopics/forumTopicsApi";
import {usePagination} from "../../helpers/pagination";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useMemo, useState} from "react";
import {getForumTopicFormPath, getForumTopicsPaginationPath} from "../../consts/routePaths";
import {FiltersType, forumTopicsActions, initFilters} from "../../redux/forum/forumTopics/forumTopicsSlice";
import {useHistory} from "react-router-dom";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import DialogFormForumTopicFilter from "../../components/forum/DialogFormForumTopicFilter";

const ForumTopics = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [dialogFilters, setDialogFilters] = useState<boolean>(false);

    const { page, rowsPerPage, storeRowsPerPage } = usePagination("forumTopics");

    const filters = useAppSelector((state) => state.ForumTopics.filters);
    const meta = useMemo(
        () => ({
            filters,
            pagination: {
                page,
                rowsPerPage,
            },
        }),
        [filters, page, rowsPerPage]
    )

    const { data: forumTopics, isFetching } = useGetForumTopicsPaginatedQuery(meta);
    const [triggerDelete] = useDeleteForumTopicMutation();

    const handleAddEditTopic = async (forumTopicId: string) => {
        history.push(getForumTopicFormPath(forumTopicId));
    }

    const handleSubmitFilters = (newFilters: FiltersType) => {
        dispatch(forumTopicsActions.setFilters({ ...filters, ...newFilters }));
        history.push(getForumTopicsPaginationPath(page, rowsPerPage));
    };
    // PAGINATION
    const onChangePage = (newValue: number) => {
        history.push(getForumTopicsPaginationPath(newValue, rowsPerPage));
    };
    const onChangeRowsPerPage = (newValue: number) => {
        storeRowsPerPage(newValue);
        history.push(getForumTopicsPaginationPath(page, newValue));
    };

    return (
        <>
            <ForumTopicsList
                data={forumTopics?.data}
                loading={isFetching}
                onDelete={(payload: ForumTopic) =>
                    triggerDelete(payload.forumTopicId).unwrap()
                }
                onEdit={handleAddEditTopic}
                toolbarProps={{
                    title: "forum.topics",
                    searchPlaceholder: "search.search",
                    searchTextPropKey: "displayName",
                    initFilters,
                    filters,
                    onAddClick: () => handleAddEditTopic(""),
                    onFilterClick: setDialogFilters,
                    onSearchSubmit: handleSubmitFilters,
                }}
                paginationProps={{
                    totalCount: forumTopics?.meta?.totalCount,
                    page,
                    rowsPerPage,
                    onChangePage,
                    onChangeRowsPerPage,
                }}
            />

            <DialogFormFrame
                onClose={() => setDialogFilters(false)}
                title="general.selectFilters"
                open={dialogFilters}
            >
                <DialogFormForumTopicFilter
                    initialData={dialogFilters!}
                    onClose={() => setDialogFilters(false)}
                    onSubmit={handleSubmitFilters}
                />
            </DialogFormFrame>
        </>
    )
}


export default ForumTopics
