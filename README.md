[![Build Status](https://travis-ci.org/kabaros/plugins-registry.svg?branch=master)](https://travis-ci.org/kabaros/plugins-registry)

# Plugins Registry

This repo contains PKP's plugins registry XML file. The live version of the file is published on: [http://pkp.sfu.ca/ojs/xml/plugins.xml](http://pkp.sfu.ca/ojs/xml/plugins.xml).

## New releases

- Fork this repo
- Add the new release of your plugin to the [XML file](./plugins.xml)
- Open a PR against this repo with the updated XML
- Once it passes the build and it is reviewed by the maintainers, it will be published.

## Checks run on the PRs

- The XML is valid accoring to the schema
- The release package URL exists on the specified URL and matches the MD5 sum.
- [Coming] Check the contents of the gzipped file
- [Coming] Run smoke and integration tests for the plugin release
