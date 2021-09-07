#!/bin/bash

# constants
CANDIDATE_BYTES=1000
MAXDEPTH=1
MAX_LANDING_PAGE_BYTES=10240

# sum compression candidate sizes
comp_size=`find ./dist -maxdepth ${MAXDEPTH} -type f -size +${CANDIDATE_BYTES}c -exec bash -c "brotli -c {} | wc -c " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`

# sum non compression candidate sizes
noncomp_size=`find ./dist -maxdepth ${MAXDEPTH} -type f -size -${CANDIDATE_BYTES}c -exec bash -c "wc -c {} " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`

total_size=`expr $comp_size + $noncomp_size`

echo ${total_size}
if (( total_size > MAX_LANDING_PAGE_BYTES )); then
  exit 0
else
  exit 1
fi
