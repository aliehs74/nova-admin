const paginate = <T>(items: T[], page: number, pageSize = 6) => {
  const size = Math.max(1, Math.floor(pageSize))
  const count = Math.max(1, Math.ceil(items.length / size))
  const current = Math.min(count, Math.max(1, Math.floor(page)))

  return { items: items.slice((current - 1) * size, current * size), page: current, count }
}

export default paginate
