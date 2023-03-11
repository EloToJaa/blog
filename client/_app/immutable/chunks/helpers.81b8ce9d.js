const t=(i,s)=>{var e;if(!s)return!1;if((e=s.permissions)!=null&&e.admin)return!0;const r=Object.keys(s.permissions||{});return i.every(n=>r.includes(n))};export{t as c};
