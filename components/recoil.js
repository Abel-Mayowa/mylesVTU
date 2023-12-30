// recoil.js

import { atom } from 'recoil';

export const csrfToken = atom({
  key: 'csrfToken', 
  default: '', 
});


export const loginStatus = atom({
  key: 'loginStatus', 
  default: false, 
});

export const userData = atom({
  key: 'userData', 
  default: {}, 
});

export const page = atom({
  key: 'page', 
  default:'', 
});

export const switchData = atom({

key:'switchData',
  defaul:false,

});
