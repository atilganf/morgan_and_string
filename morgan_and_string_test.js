
function theResults() {
   return "ABACABAOPSKNFMIWQHREYRHWIYEQHIYEHYRHWUYRHQYHQIYQEIYRHQEWYIHRWEYIHQWEIYRHEWIYRHIQRYHQIEIWUIUIWEUIEWUIWUEIUEIWUIIWUEIWUWIEU";
}
//----------input----------
function getA() {
   return "";
}
function getB() {
   return "ABACABAOPSKNFMIWQHREYRHWIYEQHIYEHYRHWUYRHQYHQIYQEIYRHQEWYIHRWEYIHQWEIYRHEWIYRHIQRYHQIEIWUIUIWEUIEWUIWUEIUEIWUIIWUEIWUWIEU";
}
//-------------------------

let a = getA();
let b = getB();
let cRes = theResults();
let indexRes = 0;
let indexA = 0;
let indexB = 0;

function recursiveEqualFunc(rslt, a, b, x, y, old) {
   //console.log("inp:" + rslt.length + " " + rslt.slice(-12) + " " + x + " " + a.slice(x, x + 5) + " " + y + " " + b.slice(y, y + 5));
   rslt += old;
   if (a.charCodeAt(x + 1) && b.charCodeAt(y + 1)) {    
      if (a.charCodeAt(x + 1) < b.charCodeAt(y + 1)) {
         rslt += a.charAt(x);
         x++;
         y -= old.length;
      } else if (a.charCodeAt(x + 1) > b.charCodeAt(y + 1)) {
         rslt += b.charAt(y);
         y++;
         x -= old.length;
         //a[x+1] === b[y+1]
      } else if (a.charCodeAt(x) < a.charCodeAt(x + 1)) {
         rslt += a.charAt(x) + b.charAt(y);
         x++;
         y++;
         //a[x] >= a[x+1] && b[y] >= b[y+1]
      } else {
         let tempX = x;
         let tempY = y;
         let fx = x;
         let fy = x;
         //stops until a[tempX + 1] > a[tempX], it means a[tempX + 1] had to be bigger where it stops.
         while (a.charCodeAt(tempX) >= a.charCodeAt(tempX + 1) &&
            b.charCodeAt(tempY) >= b.charCodeAt(tempY + 1) &&
            a.charCodeAt(tempX + 1) === b.charCodeAt(tempY + 1)) {
            tempX++;
            tempY++;
         }
         let apDiffbp = a.charCodeAt(tempX + 1) - b.charCodeAt(tempY + 1);
         if (a.charCodeAt(fx) < a.charCodeAt(tempX + 1)
            && b.charCodeAt(fy) < b.charCodeAt(tempY + 1)) {
            rslt += a.slice(x, tempX + 1) + b.slice(y, tempY + 1);
            x = tempX + 1;
            y = tempY + 1;
         } else {
            if (apDiffbp === 0) {
               old += a.slice(x, tempX + 1);
               return recursiveEqualFunc(rslt, a, b, tempX + 1, tempY + 1, old);
            } else if (apDiffbp > 0) {
               rslt += b.slice(y, tempY + 1);
               y = tempY + 1;
               x -= old.length;
            } else {
               rslt += a.slice(x, tempX + 1);
               x = tempX + 1;
               y -= old.length;
            }
         }
      }
   }
   else {
      rslt += a.charAt(x) + b.charAt(y);
      x += old.length;
      y += old.length;
   }
   //console.log("out:" + rslt.length + " " + rslt.slice(-12) + " " + x + " " + a.slice(x, x + 5) + " " + y + " " + b.slice(y, y + 5));
   return {
      rslt: rslt,
      x: x,
      y: y,
   }
}


//main function
let res = "";
let working = true;
for (let x = 0, y = 0, i = 0; x < a.length || y < b.length; i++) {
   if (x < a.length && y < b.length) {
      if (a.charCodeAt(x) < b.charCodeAt(y)) {
         res += a.charAt(x)
         x++;
      } else if (a.charCodeAt(x) > b.charCodeAt(y)) {
         res += b.charAt(y)
         y++;
      } else if (a.charCodeAt(x) === b.charCodeAt(y)) {
         let req = recursiveEqualFunc(res, a, b, x, y, "");
         if (req) {
            res = req.rslt;
            x = req.x;
            y = req.y;
         } else {
            break;
         }
      }
   } else if (x < a.length) {
      res += a.slice(x);
      x = a.length;
   } else {
      res += b.slice(y);
      y = b.length;
   }
   //controlling code, this is not part of the core code.
   if (res[i] !== cRes[i] && working) {
      indexRes = i;
      indexA = x - 1;
      indexB = y - 1;
      working = false;
   }
}

document.getElementById("a").defaultValue = a;
document.getElementById("b").defaultValue = b;
document.getElementById("myRes").defaultValue = res;
document.getElementById("res").defaultValue = cRes;
document.getElementById("temp").innerHTML = indexRes + " " + indexA + " " + indexB;