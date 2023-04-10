---
title: site
tags: navPages
layout: main.njk
navIndex: 2
---

## this site

is built with [11ty](https://www.11ty.dev/), a lightweight static site generator. Eleventy seemed to be the lightest and most flexible way to focus on content first.
An ancillary goal is to eventually get into the [10kb club](https://10kbclub.com/), which means keeping the landing page zipped bundle size under 10kb.

All to say, this site uses no front-end JavaScript at all--reducing client-load and decreasing network latency/load times!

I use GitHub actions to automate the build process is as follows:

<ul>
  <li>my resume data is generated with a custom TypeScript resume builder that outputs a <code>json</code> file source of truth</li>
  <li><code>11ty</code> initially generates static site files</li>
  <li>the GitHub action then compresses those files to get the approximate compressed file size</li>
  <li><code>11ty</code> regenerates the static site files but now with data to populate this page with file size data</li>
  <li>a LaTeX Docker process then picks up the json resume data and generates a pdf</li>
  <li>the pdf resume and static site files are pushed to AWS S3 with cache invalidation so the site is up-to-date nearly instantly</li>
</ul>

### tech

Source code for this site is available here: [GitHub](https://github.com/rcalimlim/rosscalimlim.me).
The following dependencies are automatically pulled from the <code>package.json</code> file.

#### app dependencies:

<ul>
{% if deps.length == 0 %}
  <li>none!</li>
{% else %}
  {% for item in deps %}
  <li>{{ item }}</li>
  {% endfor %}
{% endif %}
</ul>

#### dev dependencies:

<ul>
{% if devDeps.length == 0 %}
  <li>none!</li>
{% else %}
  {% for item in devDeps %}
  <li><a href={{ item.url }}>{{ item.name }}</a></li>
  {% endfor %}
{% endif %}
</ul>

#### infrastructure:

<ul>
  <li>AWS S3 - hosting</li>
  <li>AWS Route 53 - DNS</li>
  <li>AWS CloudFront - CDN</li>
  <li>GitHub - source hosting</li>
  <li>GitHub actions - ci/cd</li>
</ul>

### stats

AWS Cloudfront automatically compresses files over 1000 bytes in size. Here are the compression stats for this site's pages. Because many of the files are relatively
small, its original and compressed sizes might be the same. These values are automatically generated on every build, which fails if the landing page is too big.

#### page sizes in various states of compression (bytes)

| page   |                        orig |                        gzip |                    brotli |
| :----- | --------------------------: | --------------------------: | ------------------------: |
| home   |   {{ generated.home.orig }} |   {{ generated.home.gzip }} |   {{ generated.home.br }} |
| about  |  {{ generated.about.orig }} |  {{ generated.about.gzip }} |  {{ generated.about.br }} |
| resume | {{ generated.resume.orig }} | {{ generated.resume.gzip }} | {{ generated.resume.br }} |
| site   |   {{ generated.site.orig }} |   {{ generated.site.gzip }} |   {{ generated.site.br }} |
