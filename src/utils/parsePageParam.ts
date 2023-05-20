function parsePageParam(page: unknown) {
  const isNumber = typeof page === 'string' && page.match(/^[0-9]+$/);
  return isNumber ? parseInt(page, 10) : undefined;
}

export default parsePageParam;
