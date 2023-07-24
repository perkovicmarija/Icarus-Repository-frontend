import React from 'react';

import { IconButton, Tooltip } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({ palette: { primary: blue } });

function FilterIconCustom(props) {

  const { onFilterClick, filtersActive } = props;
  return (
    <ThemeProvider theme={theme}>
      <Tooltip title="Filters">
        <IconButton aria-label="filter-list" onClick={onFilterClick}>
          <FilterList sx={{ color: filtersActive ? 'primary.main' : 'inherit' }}/>
        </IconButton>
      </Tooltip>
    </ThemeProvider>
  );
}

export default FilterIconCustom;
