const _ = require('lodash');

const boulderGrade = [
  'VB',
  'V0',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8',
  'V9',
  'V10',
  'V11',
  'V12',
  'V13',
  'V14',
  'V15',
  'V16',
  'V17',
  'V18',
  'V19',
  'V20',
];
const routeGrade = [
  '5.0',
  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '5.5',
  '5.6',
  '5.7',
  '5.8',
  '5.9',
  '5.10a',
  '5.10b',
  '5.10c',
  '5.10d',
  '5.11a',
  '5.11b',
  '5.11c',
  '5.11d',
  '5.12a',
  '5.12b',
  '5.12c',
  '5.12d',
  '5.13a',
  '5.13b',
  '5.13c',
  '5.13d',
  '5.14a',
  '5.14b',
  '5.14c',
  '5.14d',
  '5.15a',
  '5.15b',
  '5.15c',
  '5.15d',
  '5.16a',
  '5.16b',
  '5.16c',
  '5.17d',
  '5.17a',
  '5.17b',
  '5.17c',
  '5.17d',
];

export function climbGradeConverter(grade) {
  const boulderNumber = boulderGrade.indexOf(grade);
  const routeNumber = routeGrade.indexOf(grade);
  if (boulderNumber) {
    return boulderNumber;
  } else if (routeNumber) {
    return routeNumber;
  }
  return null;
}

export function climbGradeRange(min, max) {
  const minNum = climbGradeConverter(min);
  const maxNum = climbGradeConverter(max);
  const climbObjectArray = [];

  if (min.charAt(0) === 'V') {
    const climbArray = boulderGrade.slice(minNum, maxNum + 1);
    climbArray.forEach(climbGrade =>
      climbObjectArray.push({grade: climbGrade})
    );
  } else if (min.charAt(0) === '5' || min.charAt(0) === '4') {
    const climbArray = routeGrade.slice(minNum, maxNum + 1);
    climbArray.forEach(climbGrade =>
      climbObjectArray.push({grade: climbGrade})
    );
  }
  return climbObjectArray;
}

export function regionPickClimbs(obj) {
  const climbs = [];
  obj.subregions.forEach(subregion => {
    subregion.areas.forEach(area => {
      area.subareas.forEach(subarea => {
        subarea.climbs.forEach(climb => {
          climbs.push(climb);
        });
      });
    });
  });
  return climbs;
}

export function subregionPickClimbs(obj) {
  const climbs = [];
  obj.areas.forEach(area => {
    area.subareas.forEach(subarea => {
      subarea.climbs.forEach(climb => {
        climbs.push(climb);
      });
    });
  });
  return climbs;
}

export function areaPickClimbs(obj) {
  const climbs = [];
  obj.subareas.forEach(subarea => {
    subarea.climbs.forEach(climb => {
      climbs.push(climb);
    });
  });
  return climbs;
}
