export default function <T extends Array<any>>(fn: (...args: T) => void) {
  let loading = false;

  return function (...args: T) {
    if (loading) {
      return;
    }

    loading = true;

    fn(...args);

    loading = false;
  };
}
