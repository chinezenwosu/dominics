const routes = {
  getHome: () => {
    return '/'
  },
  getDocument: (id) => {
    return `/document/${id}`
  }
}

export default routes
