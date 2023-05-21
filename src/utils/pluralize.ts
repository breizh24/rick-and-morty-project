import exp from 'constants';

function pluralize(word: string | undefined, count: number | undefined) {
  if (!word || !count) return '';
  return count === 1 ? word : word + 's';
}

export default pluralize;
