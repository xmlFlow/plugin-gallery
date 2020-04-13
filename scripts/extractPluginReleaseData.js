const { readFile, writeFile } = require('./helpers')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const https = require('https')
const crypto = require('crypto')

const { exec } = require('child_process')

const args = {
  filePath: process.argv[2] || `${__dirname}/../plugins.xml`,
  schemaLocation: process.argv[3] || 'http://pkp.sfu.ca/ojs/xml/plugins.xsd'
}

const validateXml = async filePath => {
  const xml = await readFile(filePath)
  try {
    const result = await parser.parseStringPromise(xml)

    let failures = 0
    const packages = []
    const md5Sums = []

    let packagesWithSums = ''

    result.plugins.plugin.forEach(plugin => {
      const pluginName = plugin.name[0]._
      plugin.release.forEach(release => {
        if (release.package.length > 1)
          throw 'Each release should have one package'

        const expectedMd5Sum = release.$.md5
        const version = release.$.version
        packages.push(release.package[0])
        md5Sums.push(expectedMd5Sum)

        packagesWithSums += expectedMd5Sum + ':' + release.package[0] + '\n'
      })
    })
    writeFile(__dirname + '/../out/packages.txt', packages.join('\r\n'))
    writeFile(__dirname + '/../out/md5sums.txt', md5Sums.join('\r\n'))
    writeFile(__dirname + '/../out/packages-md5sums.txt', packagesWithSums)
  } catch (err) {
    throw err
  }
}

validateXml(args.filePath)
