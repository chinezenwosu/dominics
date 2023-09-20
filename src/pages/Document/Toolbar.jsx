import React from 'react'

const TOOLBAR_ID = 'toolbar'

const Toolbar = () => (
  <div id={TOOLBAR_ID}>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
  </div>
)

const toolbarModule = {
  container: `#${TOOLBAR_ID}`,
}

export default Toolbar
export { toolbarModule }
