const { markdownTable } = require('markdown-table')

const { STATUS, countStatuses } = require('./utils')

const ASSETS_URL = {
  ADDED:
    'https://raw.githubusercontent.com/step-security/npm-lockfile-changes/main/assets/added.svg',
  DOWNGRADED:
    'https://raw.githubusercontent.com/step-security/npm-lockfile-changes/main/assets/downgraded.svg',
  REMOVED:
    'https://raw.githubusercontent.com/step-security/npm-lockfile-changes/main/assets/removed.svg',
  UPDATED:
    'https://raw.githubusercontent.com/step-security/npm-lockfile-changes/main/assets/updated.svg',
}

const getStatusLabel = (status) =>
  `[<sub><img alt="${status}" src="${ASSETS_URL[status]}" height="16" /></sub>](#)`

const createTable = (lockChanges, plainStatuses = false) =>
  markdownTable(
    [
      ['Name', 'Status', 'Previous', 'Current'],
      ...Object.entries(lockChanges)
        .map(([key, { status, previous, current }]) => [
          '`' + key + '`',
          plainStatuses ? status : getStatusLabel(status),
          previous,
          current,
        ])
        .sort((a, b) => a[0].localeCompare(b[0])),
    ],
    { align: ['l', 'c', 'c', 'c'], alignDelimiters: false }
  )

const createSummaryRow = (lockChanges, status) => {
  const statusCount = countStatuses(lockChanges, status)
  return statusCount ? [getStatusLabel(status), statusCount] : undefined
}

const createSummary = (lockChanges) =>
  markdownTable(
    [
      ['Status', 'Count'],
      createSummaryRow(lockChanges, STATUS.ADDED),
      createSummaryRow(lockChanges, STATUS.UPDATED),
      createSummaryRow(lockChanges, STATUS.DOWNGRADED),
      createSummaryRow(lockChanges, STATUS.REMOVED),
    ].filter(Boolean),
    { align: ['l', 'c'], alignDelimiters: false }
  )

module.exports = { createTable, createSummary }
