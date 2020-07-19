const generateId = (context, ee, next) => {
  const id = Math.floor(1 + (9999999 - 1) * Math.random());
  context.vars.id = id;
  return next();
}