#!/bin/bash

# constants
CANDIDATE_BYTES=1000
MAXDEPTH=1
MAX_LANDING_PAGE_BYTES=10240

# save timestamp
build_timestamp=`node -e 'console.log(Date.now())'`

# compute original size
orig_size=`find ./dist -maxdepth ${MAXDEPTH} -type f -exec bash -c "wc -c {} " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`

# sum gzip compression candidate sizes
gzip_comp_size=`find ./dist -maxdepth ${MAXDEPTH} -type f -size +${CANDIDATE_BYTES}c -exec bash -c "gzip -c {} | wc -c " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`
# sum brotli compression candidate sizes
br_comp_size=`find ./dist -maxdepth ${MAXDEPTH} -type f -size +${CANDIDATE_BYTES}c -exec bash -c "brotli -c {} | wc -c " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`

# sum non compression candidate sizes
noncomp_size=`find ./dist -maxdepth ${MAXDEPTH} -type f -size -${CANDIDATE_BYTES}c -exec bash -c "wc -c {} " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`

# sum gzip file sizes
gzip_total_size=`expr $gzip_comp_size + $noncomp_size`
# sum br file sizes
br_total_size=`expr $br_comp_size + $noncomp_size`

# output JSON data for site consumption
jq -n \
  --arg ts $build_timestamp \
  --arg orig $orig_size \
  --arg gzip $gzip_total_size \
  --arg br $br_total_size \
  '{
      _metadata: { createdAt: $ts },
      home: {
        orig: $orig | tonumber,
        gzip: $gzip | tonumber,
        br: $br | tonumber,
      },
   }' > src/_data/generated.json

# we only care about br size for 10kb club
if (( br_total_size < MAX_LANDING_PAGE_BYTES )); then
  # success, total brotli file sizes are less than threshold
  exit 0
else
  # failure, total brotli file sizes are greater than threshold
  exit 1
fi
