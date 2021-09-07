---
title: site
tags: navPages
layout: main.njk
navIndex: 2
---

## this site
is built with [11ty](https://www.11ty.dev/), a lightweight static site generator. Eleventy seemed to be the lightest and most flexible way to focus on content first. An ancillary goal is
to eventually get into the [10kb club](https://10kbclub.com/), which means keeping the landing page zipped bundle size under 10kb.

All to say, this site uses no front-end JavaScript at all--reducing client-load and decreasing network latency/load times!

### stats
AWS Cloudfront automatically compresses files over 1000 bytes in size. Here are the compression stats for this site's pages (just home for now, more to come). Because many of the files are relatively
small, its original and compressed sizes might be the same. These values are automatically generated on every build.

#### page sizes in various states of compression (bytes)
| page | orig | gzip | brotli |
| :--- | ---: | ---: | -----: |
| home | {{ generated.home.orig }} | {{ generated.home.gzip }} | {{ generated.home.br }} |
