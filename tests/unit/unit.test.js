const fs = require('fs')
const path = require('path')
const PackageLockParser =
  require('snyk-nodejs-lockfile-parser/dist/parsers/package-lock-parser').PackageLockParser
const { diffLocks, STATUS, countStatuses } = require('../../src/utils')

let packageLockParser

const getTestLockContent = (testName, filename) => {
  const content = fs.readFileSync(
    path.resolve(process.cwd(), './tests/unit/', testName, filename),
    { encoding: 'utf-8' }
  )
  return content
}

beforeEach(() => {
  packageLockParser = new PackageLockParser()
})

test('calculating the diff of two lockfiles works', () => {
  const contentA = getTestLockContent('downgrade', 'a.json')
  const contentB = getTestLockContent('downgrade', 'b.json')

  const result = diffLocks(
    packageLockParser.parseLockFile(contentA),
    packageLockParser.parseLockFile(contentB)
  )

  expect(Object.keys(result).length).toBe(6)

  expect(countStatuses(result, STATUS.ADDED)).toBe(5)
  expect(countStatuses(result, STATUS.UPDATED)).toBe(0)
  expect(countStatuses(result, STATUS.DOWNGRADED)).toBe(1)
  expect(countStatuses(result, STATUS.REMOVED)).toBe(0)
})
