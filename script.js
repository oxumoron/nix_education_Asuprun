import {condidateArr} from './candidates.js';

class Condidate {
  constructor(condidateArr) {
    Object.assign(this, condidateArr)
  }
  //          1
  searchCandidatesByPhoneNumber(tel) {
    let newTel = tel.replace(/[^\d]/g, '');
    return condidateConstructorArr.filter(({
      phone
    }) => {
      let newPhone = phone.replace(/[^\d]/g, '');
      if (newPhone.indexOf(newTel) >= 0) {
        let newArr = [];
        return newArr.push(condidateConstructorArr[newPhone.indexOf(newTel)])
      }
    });
  }
  //            2
  getCandidateById(id) {
    let buff = ''
    const result = condidateArr.find(({
      _id,
      registered
    }) => {
      if (_id === id) {
        const d = new Date(registered)
        buff = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
        return true
      }
      return false
    })
    return result ? {
      ...result,
      registered: buff
    } : undefined
  }
}

const condidateConstructorArr = condidateArr.map(cond => new Condidate(cond));
const condidate = new Condidate(condidateArr);

//        1
console.log('=====1=====',condidate.searchCandidatesByPhoneNumber('43'));
console.log(condidate.searchCandidatesByPhoneNumber('+1 (857) 56'))
// /// [Candidate, Candidate ...]
console.log(condidate.searchCandidatesByPhoneNumber('+1(869)408-3982'))
// /// [Candidate]

//         2
console.log('=====2=====',condidate.getCandidateById('5e216bc9a6059760578aefa4'));
// console.log(condidate.getCandidateById('5e216bc9a6059760578aefa4')); 

//          3
function sortCandidatesArr(sortBy) {
  return condidateArr.sort((prev, next) => {
    let prevB = prev.balance.replace(/[^\d]/g, '');
    let nextB = next.balance.replace(/[^\d]/g, '');
    if (sortBy === 'asc') {
      return prevB - nextB
    } else if (sortBy === 'desc') {
      return nextB - prevB
    } else {
      return 0
    }
  })
}
// console.log(sortCandidatesArr('asc').map(el=> el.balance));
// console.log(sortCandidatesArr('desc').map(el=> el.balance));
// console.log(sortCandidatesArr().map(el=> el.balance));
console.log('=====3=====',sortCandidatesArr('asc').map(el => el.balance));
console.log(sortCandidatesArr('desc').map(el => el.balance));
console.log(sortCandidatesArr().map(el => el.balance));

//          4
const result4 = {};
condidateArr.map(candidate => {
  if (!result4[candidate.eyeColor]) {
    result4[candidate.eyeColor] = [candidate]
  } else {
    result4[candidate.eyeColor].push(candidate)
  }
})
console.log('=====4=====', result4);