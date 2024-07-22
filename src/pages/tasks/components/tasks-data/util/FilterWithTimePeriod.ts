enum TimePeriod {
  Today = 'hoje',
  OneWeek = '1 semana',
  OneMonth = '1 mes',
  ThreeMonths = '3 meses',
  SixMonths = '6 meses',
  OneYear = '1 ano',
  AllTime = 'todo tempo',
}

export type IOption = { label: string; value: TimePeriod }

const getPastDate = (timePeriod: TimePeriod): Date => {
  const now = new Date()
  let pastDate = new Date()

  switch (timePeriod) {
    case TimePeriod.Today:
      break
    case TimePeriod.OneWeek:
      pastDate.setDate(now.getDate() - 7)
      break
    case TimePeriod.OneMonth:
      pastDate.setMonth(now.getMonth() - 1)
      break
    case TimePeriod.ThreeMonths:
      pastDate.setMonth(now.getMonth() - 3)
      break
    case TimePeriod.SixMonths:
      pastDate.setMonth(now.getMonth() - 6)
      break
    case TimePeriod.OneYear:
      pastDate.setFullYear(now.getFullYear() - 1)
      break
    case TimePeriod.AllTime:
      pastDate = new Date(0)
      break
  }

  return pastDate
}

const timePeriodOptions: IOption[] = [
  { label: 'Today', value: TimePeriod.Today },
  { label: '1 Week', value: TimePeriod.OneWeek },
  { label: '1 Mounth', value: TimePeriod.OneMonth },
  { label: '3 Mounths', value: TimePeriod.ThreeMonths },
  { label: '6 Mounths', value: TimePeriod.SixMonths },
  { label: '1 Year', value: TimePeriod.OneYear },
  { label: 'All time', value: TimePeriod.AllTime },
]

export { timePeriodOptions, getPastDate, TimePeriod }
