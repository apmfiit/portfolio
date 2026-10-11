/* esm.sh - figma-squircle@1.1.0 */
function L({topLeftCornerRadius:e,topRightCornerRadius:n,bottomRightCornerRadius:$,bottomLeftCornerRadius:o,width:t,height:r}){let i={topLeft:-1,topRight:-1,bottomLeft:-1,bottomRight:-1},u={topLeft:e,topRight:n,bottomLeft:o,bottomRight:$};return Object.entries(u).sort(([,f],[,a])=>a-f).forEach(([f,a])=>{let m=f,c=A[m],g=Math.min(...c.map(s=>{let h=u[s.corner];if(a===0&&h===0)return 0;let p=i[s.corner],d=s.side==="top"||s.side==="bottom"?t:r;return p>=0?d-i[s.corner]:a/(a+h)*d}));i[m]=g,u[m]=Math.min(a,g)}),{topLeft:{radius:u.topLeft,roundingAndSmoothingBudget:i.topLeft},topRight:{radius:u.topRight,roundingAndSmoothingBudget:i.topRight},bottomLeft:{radius:u.bottomLeft,roundingAndSmoothingBudget:i.bottomLeft},bottomRight:{radius:u.bottomRight,roundingAndSmoothingBudget:i.bottomRight}}}var A={topLeft:[{corner:"topRight",side:"top"},{corner:"bottomLeft",side:"left"}],topRight:[{corner:"topLeft",side:"top"},{corner:"bottomRight",side:"right"}],bottomLeft:[{corner:"bottomRight",side:"bottom"},{corner:"topLeft",side:"left"}],bottomRight:[{corner:"bottomLeft",side:"bottom"},{corner:"topRight",side:"right"}]};function P({cornerRadius:e,cornerSmoothing:n,preserveSmoothing:$,roundingAndSmoothingBudget:o}){let t=(1+n)*e;if(!$){let h=o/e-1;n=Math.min(n,h),t=Math.min(t,o)}let r=90*(1-n),i=Math.sin(M(r/2))*e*Math.sqrt(2),u=(90-r)/2,f=e*Math.tan(M(u/2)),a=45*n,m=f*Math.cos(M(a)),c=m*Math.tan(M(a)),g=(t-i-m-c)/3,s=2*g;if($&&t>o){let h=o-c-i-m,p=h/6,d=h-p;g=Math.min(g,d),s=h-g,t=Math.min(t,o)}return{a:s,b:g,c:m,d:c,p:t,arcSectionLength:i,cornerRadius:e}}function B({width:e,height:n,topLeftPathParams:$,topRightPathParams:o,bottomLeftPathParams:t,bottomRightPathParams:r}){return`
    M ${e-o.p} 0
    ${b(o)}
    L ${e} ${n-r.p}
    ${x(r)}
    L ${t.p} ${n}
    ${T(t)}
    L 0 ${$.p}
    ${F($)}
    Z
  `.replace(/[\t\s\n]+/g," ").trim()}function b({cornerRadius:e,a:n,b:$,c:o,d:t,p:r,arcSectionLength:i}){return e?l`
    c ${n} 0 ${n+$} 0 ${n+$+o} ${t}
    a ${e} ${e} 0 0 1 ${i} ${i}
    c ${t} ${o}
        ${t} ${$+o}
        ${t} ${n+$+o}`:l`l ${r} 0`}function x({cornerRadius:e,a:n,b:$,c:o,d:t,p:r,arcSectionLength:i}){return e?l`
    c 0 ${n}
      0 ${n+$}
      ${-t} ${n+$+o}
    a ${e} ${e} 0 0 1 -${i} ${i}
    c ${-o} ${t}
      ${-($+o)} ${t}
      ${-(n+$+o)} ${t}`:l`l 0 ${r}`}function T({cornerRadius:e,a:n,b:$,c:o,d:t,p:r,arcSectionLength:i}){return e?l`
    c ${-n} 0
      ${-(n+$)} 0
      ${-(n+$+o)} ${-t}
    a ${e} ${e} 0 0 1 -${i} -${i}
    c ${-t} ${-o}
      ${-t} ${-($+o)}
      ${-t} ${-(n+$+o)}`:l`l ${-r} 0`}function F({cornerRadius:e,a:n,b:$,c:o,d:t,p:r,arcSectionLength:i}){return e?l`
    c 0 ${-n}
      0 ${-(n+$)}
      ${t} ${-(n+$+o)}
    a ${e} ${e} 0 0 1 ${i} -${i}
    c ${o} ${-t}
      ${$+o} ${-t}
      ${n+$+o} ${-t}`:l`l 0 ${-r}`}function M(e){return e*Math.PI/180}function l(e,...n){return e.reduce(($,o,t)=>{let r=n[t];return typeof r=="number"?$+o+r.toFixed(4):$+o+(r??"")},"")}function y({cornerRadius:e=0,topLeftCornerRadius:n,topRightCornerRadius:$,bottomRightCornerRadius:o,bottomLeftCornerRadius:t,cornerSmoothing:r,width:i,height:u,preserveSmoothing:f=!1}){if(n=n??e,$=$??e,t=t??e,o=o??e,n===$&&$===o&&o===t&&t===n){let s=Math.min(i,u)/2,h=Math.min(n,s),p=P({cornerRadius:h,cornerSmoothing:r,preserveSmoothing:f,roundingAndSmoothingBudget:s});return B({width:i,height:u,topLeftPathParams:p,topRightPathParams:p,bottomLeftPathParams:p,bottomRightPathParams:p})}let{topLeft:a,topRight:m,bottomLeft:c,bottomRight:g}=L({topLeftCornerRadius:n,topRightCornerRadius:$,bottomRightCornerRadius:o,bottomLeftCornerRadius:t,width:i,height:u});return B({width:i,height:u,topLeftPathParams:P({cornerSmoothing:r,preserveSmoothing:f,cornerRadius:a.radius,roundingAndSmoothingBudget:a.roundingAndSmoothingBudget}),topRightPathParams:P({cornerSmoothing:r,preserveSmoothing:f,cornerRadius:m.radius,roundingAndSmoothingBudget:m.roundingAndSmoothingBudget}),bottomRightPathParams:P({cornerSmoothing:r,preserveSmoothing:f,cornerRadius:g.radius,roundingAndSmoothingBudget:g.roundingAndSmoothingBudget}),bottomLeftPathParams:P({cornerSmoothing:r,preserveSmoothing:f,cornerRadius:c.radius,roundingAndSmoothingBudget:c.roundingAndSmoothingBudget})})}export{y as getSvgPath};
//# sourceMappingURL=figma-squircle.mjs.map