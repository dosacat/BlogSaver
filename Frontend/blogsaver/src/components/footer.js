import React from 'react';
import {Box,Typography} from '@mui/material';

function Footer() {
  return (
    <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p:2,
          backgroundColor: '#9C27B0'
        }}
      >
        <Typography
          level="body2"
          startDecorator={<Typography textColor="text.tertiary">by</Typography>}
        >
          curating reads
        </Typography>

        <Typography level="body3" sx={{ ml: 'auto' }}>
          dosacat
        </Typography>
      </Box>
  )
}

export default Footer;