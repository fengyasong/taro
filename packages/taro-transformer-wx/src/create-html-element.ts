const voidHtmlTags = new Set<string>([
  'area',
  'base',
  'basefont',
  'bgsound',
  'br',
  'col',
  'command',
  'embed',
  'frame',
  'hr',
  'image',
  'img',
  'input',
  'isindex',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'nextid',
  'param',
  'source',
  'track',
  'wbr',
  'import'
])

interface Options {
  name: string,
  attributes: object,
  value: string
}

function stringifyAttributes (input: object) {
  const attributes: string[] = []

  for (const key of Object.keys(input)) {
    let value = input[key]

    if (value === false) {
      continue
    }

    if (Array.isArray(value)) {
      value = value.join(' ')
    }

    let attribute = key

    if (value !== true) {
      attribute += `="${String(value)}"`
    }

    attributes.push(attribute)
  }

  return attributes.length > 0 ? ' ' + attributes.join(' ') : ''

}

export const createHTMLElement = (options: Options) => {
  options = Object.assign(
    {
      name: 'div',
      attributes: {},
      value: ''
    },
    options
  )

  const isVoidTag = voidHtmlTags.has(options.name)

  let ret = `<${options.name}${stringifyAttributes(options.attributes)}${isVoidTag ? `/` : '' }>`

  if (!isVoidTag) {
    ret += `${options.value}</${options.name}>`
  }

  return ret
}
