import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box, Grid } from '@material-ui/core';

ProductSkeleton.propTypes = {
  length: PropTypes.number,
};

ProductSkeleton.defaultProps = {
  length: 6,
};

function ProductSkeleton(props) {
  const { length } = props;
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box padding={2}>
                <Skeleton variant='rect' width='100%' height={200} />
                <Skeleton pt={0.5} />
                <Skeleton width='60%' />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ProductSkeleton;
