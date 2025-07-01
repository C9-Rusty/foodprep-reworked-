import {mkdirSync, writeFileSync, existsSync} from 'fs'
import {join} from 'path'

const [,,componentName] = process.argv

if (!componentName) {
    console.log('Please provide a component name')
    process.exit(1)
}

const componentDir = join(process.cwd(),'src', 'components', componentName)
const jsxFile = join(componentDir, `${componentName}.jsx`)
const cssFile = join(componentDir, `${componentName}.css`)

if(existsSync(componentDir)){
    console.log('Component already exists')
    process.exit(1)
}

mkdirSync(componentDir)

const jsxTemplate = `import React from 'react'
import './${componentName}.css'

const ${componentName} = () => {
  return (
    <div className='${componentName.toLowerCase()}'> 
      ${componentName} 
    </div>
  )
}

export default ${componentName}
`

writeFileSync(jsxFile, jsxTemplate)
console.log(`Created ${jsxFile}`)

const cssTemplate = `.${componentName.toLowerCase()}{
  /* add styles here */
}
`

writeFileSync(cssFile, cssTemplate)
console.log(`Created ${cssFile}`)
