function notFound(_req, _res, next) {
  next({
    status: 404,
    message: "Route not found",
  });
}

export default notFound;