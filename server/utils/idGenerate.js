// generate student id and admin user id use for login 
export const generateUserId = (email, name, phoneno) => {
  const text = "robovationstudymaterial"
  const e = (email || '').slice(0, 2).toLowerCase();
  const i = (text || '').slice(0, 2).toLowerCase();
  const o = (name || '').slice(0, 2).toLowerCase();
  const p = (phoneno || '').toString().slice(0, 2).toLowerCase();
  const unique = Math.random().toString(36).substring(2, 5);
  const userId = `${i}${e}${o}${p}${unique}`;

  return userId;
}




export const generateStudentId = (email,name) => {
  const text = "robovationstudymaterial"
  const e = (email || '').slice(0, 2).toLowerCase();
  const i = (text || '').slice(0, 2).toLowerCase();
  const o = (name || '').slice(0, 2).toLowerCase();
  const unique = Math.random().toString(36).substring(2, 5);
  const userId = `${i}${e}${o}${unique}`;

  return userId;
}



export const generateId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

