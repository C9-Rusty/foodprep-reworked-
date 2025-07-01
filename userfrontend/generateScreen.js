import {mkdirSync, writeFileSync, existsSync} from 'fs'
import {join} from 'path'

const [,,screenName] = process.argv

if (!screenName) {
    console.log('Please provide a screen name')
    process.exit(1)
}

const screenDir = join(process.cwd(),'src', 'screens', screenName)
const jsxFile = join(screenDir, `${screenName}.jsx`)
const cssFile = join(screenDir, `${screenName}.css`)

if(existsSync(screenDir)){
    console.log('screen already exists')
    process.exit(1)
}

mkdirSync(screenDir)

const jsxTemplate = `
import React from 'react'
import './${screenName}.css'

const ${screenName} = () => {
  return (
    <div className='${screenName.toLowerCase()}'> ${screenName}</div>
  )
}

export default ${screenName}
`

writeFileSync(jsxFile, jsxTemplate)
console.log(`Created ${jsxFile}`)

const cssTemplate = `
    .${screenName.toLowerCase()}{
        /* add styles here */
    }
`

writeFileSync(cssFile, cssTemplate)
console.log(`Created ${cssFile}`)
