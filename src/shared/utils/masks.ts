function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength - 3) + '...'
}

export { capitalize, truncateText }
