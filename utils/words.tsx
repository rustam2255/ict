// matnni 20 ta so‘zdan keyin qisqartiradigan helper
export const truncateWords = (text: string, wordLimit: number) => {
  const words = text.split(" ")
  if (words.length <= wordLimit) return text
  return words.slice(0, wordLimit).join(" ") + "..."
}
