export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export function addHttpsPrefix(link: string) {
  if (!/^https?:\/\//i.test(link)) {
    return 'https://' + link;
  }
  return link;
}
