export const workplaces = [
  {
    label: 'Frontend',
    value: 'Frontend',
    imgUrl: '../../../assets/angular.png',
  },
  {
    label: 'Backend',
    value: 'Backend',
    imgUrl: '../../../assets/backend.png',
  },
  {
    label: 'Data Analyst',
    value: 'Data Analyst',
    imgUrl: '../../../assets/data-analyst.png',
  },
  {
    label: 'Fullstack',
    value: 'Fullstack',
    imgUrl: '../../../assets/fullstack.svg',
  },
  {
    label: 'SQL',
    value: 'SQL',
    imgUrl: '../../../assets/sql.png',
  },
];

// get image url
export function getImageUrl(name: string) {
  const workplace = workplaces.find(
    (wp) => wp.label === name || wp.value === name
  );
  return workplace ? workplace.imgUrl : 'No image URL found';
}
