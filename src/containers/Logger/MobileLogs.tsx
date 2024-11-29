import MobileLogsList from "../../components/logger/MobileLogsList";
import {FiltersType} from "../../redux/logger/loggerSlice";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {initFilters, loggerActions} from "../../redux/logger/loggerSlice";
import {useEffect, useMemo, useState} from "react";
import {usePagination} from "../../helpers/pagination";
import {getMobileLogsPaginationPath} from "../../consts/routePaths";
import {useHistory, useParams} from "react-router-dom";
import {MobileLog, useGetMobileLogsPaginatedQuery} from "../../redux/logger/loggerApi";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import DialogFormLoggerFilters from "../../components/logger/DialogFormLoggerFilters";

function MobileLogs() {
    const { platform, clientAbbreviation } = useParams<{platform: string, clientAbbreviation: string}>();
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [dialogFilters, setDialogFilters] = useState<FiltersType | undefined>()

    const { page, rowsPerPage, storeRowsPerPage } = usePagination("mobileLogs");
    const filters = useAppSelector((state) => state.Logger.filters);

    useEffect(() => {
        dispatch(loggerActions.setFilters({ ...filters,
            client: clientAbbreviation,
            source: platform
        }));
    },[clientAbbreviation, platform])

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

    const { data, isFetching } = useGetMobileLogsPaginatedQuery(meta);


    const handleSubmitFilters = (newFilters: FiltersType) => {
        dispatch(loggerActions.setFilters({ ...filters, ...newFilters }));
        history.push(getMobileLogsPaginationPath(platform, clientAbbreviation, page, rowsPerPage));
    };

    const onChangePage = (newValue: number) => {
        history.push(getMobileLogsPaginationPath(platform, clientAbbreviation, newValue, rowsPerPage));
    };

    const onChangeRowsPerPage = (newValue: number) => {
        storeRowsPerPage(newValue);
        history.push(getMobileLogsPaginationPath(platform, clientAbbreviation, 0, newValue));
    };

    return (
        <>
            <MobileLogsList<MobileLog>
                data={data?.data}
                toolbarProps={{
                    title: "logger.title",
                    searchPlaceholder: "search.byMessage",
                    searchTextPropKey: "stringSearch",
                    onSearchSubmit: handleSubmitFilters,
                    initFilters: initFilters,
                    filters: filters,
                    onFilterClick: setDialogFilters
                }}
                paginationProps={{
                    totalCount: data?.meta.totalCount,
                    page,
                    rowsPerPage,
                    onChangePage,
                    onChangeRowsPerPage,
                }}
                loading={isFetching}
            />

            <DialogFormFrame
                onClose={() => setDialogFilters(undefined)}
                title="general.selectFilters"
                open={dialogFilters}
            >
                <DialogFormLoggerFilters
                    initialData={dialogFilters!}
                    onClose={() => setDialogFilters(undefined)}
                    onSubmit={handleSubmitFilters}
                />
            </DialogFormFrame>
        </>
    )
}

export default MobileLogs;
