export interface TocItem {
    id: string
    text: string
    level: number
}

export function extractToc(content: string): TocItem[] {
    const headings: TocItem[] = []
    const regex = /^(#{2,3})\s+(.+)$/gm
    let match

    while ((match = regex.exec(content)) !== null) {
        const level = match[1].length
        const rawText = match[2].trim()

        const cleanText = rawText
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')

        const id = cleanText
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()

        if (id && cleanText) {
            headings.push({ id, text: cleanText, level })
        }
    }

    return headings
}