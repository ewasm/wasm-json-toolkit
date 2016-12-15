const SECTION_IDS = require('./json2wasm').SECTION_IDS
const UNIQUE_ENTRY = new Set(['import', 'type'])

/**
 * adds a section. Overwrites that section if it already exists
 */
exports.setSection = (module, newSection) => {
  const newSectionId = SECTION_IDS[newSection.name]
  if (newSectionId) {
    for (let index in module) {
      const section = module[index]
      const sectionId = SECTION_IDS[section.name]
      if (sectionId) {
        // overwrite an existing section
        if (newSectionId === sectionId) {
          module[index] = newSection
          return
        } else if (newSectionId < sectionId) {
          // inject a new section
          module.splice(index, 0, newSection)
          return
        }
      }
    }
    // append the new section
    module.push(newSection)
  } else {
    throw new Error(`invalid section name: ${newSection.name}`)
  }
}
/**
 * finds a section given a section name
 */
exports.findSection = (module, sectionName) => {
  return module.find(section => section.name === sectionName)
}

/**
 * adds an entry to a section, if the section doesn't exist creates it
 * @return {Number} the index of the  new entry
 */
exports.addEntry = (module, sectionName, newEntry) => {
  const section = exports.findSection(module, sectionName)
  if (section) {
    // search for non-unique entries
    const index = section.entries.findIndex(entry => JSON.stringify(entry) === JSON.stringify(newEntry))
    if (UNIQUE_ENTRY.has(sectionName) && index !== -1) {
      return index
    } else {
      return section.entries.push(newEntry) - 1
    }
  } else {
    exports.setSection(module, {
      name: sectionName,
      entries: [newEntry]
    })
    return 0
  }
}

/**
 * Adds a func to the module given code and the type
 */
exports.addFunction = (module, func) => {
  const index = exports.addEntry(module, 'type', func.type)
  exports.addEntry(module, 'function', index)
  exports.addEntry(module, 'code', func.code)
}

/**
 * Adds a func to the module given code and the type
 */
exports.addImport = (module, imprt) => {
  const index = exports.addEntry(module, 'type', imprt.type)
  imprt.import.index = index
  exports.addEntry(module, 'import', imprt.import)
}
