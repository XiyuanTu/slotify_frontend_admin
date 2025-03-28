import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';

const ActionButton = ({
  color,
  icon,
  tooltip,
  callback,
  disabled = false,
  loading = false,
  offset,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        mb: 2,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Tooltip
        title={tooltip}
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset,
                },
              },
            ],
          },
        }}
      >
        <span>
          <IconButton
            sx={{ color }}
            onClick={callback}
            disabled={disabled || loading}
            loading={loading}
          >
            {icon}
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default ActionButton;
