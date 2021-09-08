#!/bin/bash

# constants
MAXDEPTH=1
CANDIDATE_BYTES=1000
MAX_LANDING_PAGE_BYTES=10240

# save timestamp
build_timestamp=`node -e 'console.log(Date.now())'`

# takes a path, outputs file size stats
compute_path_size () {
  # save path
  local path=$1
  local var=$2

  # compute uncompressed file size
  local orig_size=`find ${path} -maxdepth ${MAXDEPTH} -type f -exec bash -c "wc -c {} " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`

  # compute gzip compression candidates size
  local gzip_comp_size=`find ${path} -maxdepth ${MAXDEPTH} -type f -size +${CANDIDATE_BYTES}c -exec bash -c "gzip -c {} | wc -c " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`
  # compute brotli compression candidates size
  local br_comp_size=`find ${path} -maxdepth ${MAXDEPTH} -type f -size +${CANDIDATE_BYTES}c -exec bash -c "brotli -c {} | wc -c " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`
  # comput non compression candidates size
  local noncomp_size=`find ${path} -maxdepth ${MAXDEPTH} -type f -size -${CANDIDATE_BYTES}c -exec bash -c "wc -c {} " \; | awk '{s+=$1} END {print (s=="" ? 0 : s) }'`

  # sum compression candidates with non compression candidates
  local gzip_total_size=`expr $gzip_comp_size + $noncomp_size`
  local br_total_size=`expr $br_comp_size + $noncomp_size`

  # store full obj result
  local result=`jq -n \
    --arg orig $orig_size \
    --arg gzip $gzip_total_size \
    --arg br $br_total_size \
    '{
      orig: $orig | tonumber,
      gzip: $gzip | tonumber,
      br: $br | tonumber,
    }'`

  # evaluate result into passed variable
  eval $var="'$result'"
}

compute_path_size "./dist" home
compute_path_size "./dist/about" about
compute_path_size "./dist/resume" resume
compute_path_size "./dist/site" site

# ???
output=`echo "[$(echo $home | jq .), $(echo $about | jq .), $(echo $resume | jq .), $(echo $site | jq .)]" | jq --arg ts $build_timestamp '{_metadata: {createdAt: $ts | tonumber}, home:.[0], about:.[1], resume:.[2], site:.[3]}'`
echo $output | jq . > src/_data/generated.json
echo $output

# we only care about br size of landing page for 10kb club
landing_page_br_size=`echo $output | jq .home.br`
if (( landing_page_br_size < MAX_LANDING_PAGE_BYTES )); then
  # success, total brotli file sizes are less than threshold
  exit 0
else
  # failure, total brotli file sizes are greater than threshold
  exit 1
fi
