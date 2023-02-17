import React from 'react';

import { IconButton, Tooltip } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({palette: {primary: blue}})

function FilterIconCustom(props) {

    const {onFilterClick, filtersActive} = props;
    return (
        <ThemeProvider theme={theme}>
            <Tooltip title="Filters">
                <IconButton aria-label="filter-list" onClick={onFilterClick}>
                    <FilterList color={filtersActive ? "primary" : undefined}/>
                </IconButton>
            </Tooltip>
        </ThemeProvider>
    );
}

export default FilterIconCustom;