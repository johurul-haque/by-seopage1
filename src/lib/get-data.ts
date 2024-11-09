export function getTasks() {
  return [...new Array(10)];
}

export function getCategories() {
  return [
    {
      label: 'Incomplete',
      color: 'red',
    },
    {
      label: 'To Do',
      color: 'blue',
    },
    {
      label: 'Doing',
      color: 'yellow',
    },
    {
      label: 'Under Review',
    },
    {
      label: 'Completed',
    },
    {
      label: 'Overdue',
    },
  ];
}
