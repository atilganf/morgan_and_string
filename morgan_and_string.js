function recursiveEqualFunc(rslt, a, b, x, y, old) {
   if (a.charAt(x + 1) && b.charAt(y + 1)) {
      rslt += old;
      if (a.charCodeAt(x + 1) < b.charCodeAt(y + 1)) {
         rslt += a.charAt(x);
         x++;
         y -= old.length;
      } else if (a.charCodeAt(x + 1) > b.charCodeAt(y + 1)) {
         rslt += b.charAt(y);
         y++;
         x -= old.length;
      } else if (a.charCodeAt(x) < a.charCodeAt(x + 1)) {
         rslt += a.charAt(x) + b.charAt(y);
         x++;
         y++;
      } else if (a.charCodeAt(x) > a.charCodeAt(x + 1)) {
         rslt += a.charAt(x);
         x++;
         y -= old.length;
      } else {
         let tempX = x + 1;
         let tempY = y + 1;
         while (a.charCodeAt(tempX) === a.charCodeAt(tempX + 1)) {
            tempX++;
         }
         while (b.charCodeAt(tempY) === b.charCodeAt(tempY + 1)) {
            tempY++;
         }
         let aPlusSmaller = a.charCodeAt(tempX) > a.charCodeAt(tempX + 1);
         let bPlusSmaller = b.charCodeAt(tempY) > b.charCodeAt(tempY + 1);
         let aDiffBCharCode = a.charCodeAt(tempX + 1) - b.charCodeAt(tempY + 1);
         let xDifMnsYDif = (tempX - x) - (tempY - y);
         if (!aPlusSmaller && !bPlusSmaller) {
            rslt += a.slice(x, tempX) + b.slice(y, tempY);
            x = tempX;
            y = tempY;
         } else if (aPlusSmaller && bPlusSmaller) {
            if (xDifMnsYDif < 0) {
               rslt += a.slice(x, tempX);
               x = tempX;
               y -= old.length;
            } else if (xDifMnsYDif > 0) {
               rslt += b.slice(y, tempY);
               y = tempY;
               x -= old.length;
            } else {
               if (aDiffBCharCode > 0) {
                  rslt += b.slice(y, tempY);
                  y = tempY;
                  x -= old.length;
               } else if (aDiffBCharCode < 0) {
                  rslt += a.slice(x, tempX);
                  x = tempX;
                  y -= old.length;
               } else {
                  old += a.slice(x, tempX + 1);
                  return recursiveEqualFunc(rslt, a, b, tempX + 1, tempY + 1, old);
               }
            }
         }
      }
   } else {
      rslt += a.charAt(x) + b.charAt(y);
      x++;
      y++;
   }
   return {
      rslt: rslt,
      x: x,
      y: y,
   }

}
//main function
let res = "";
for (let x = 0, y = 0; x < a.length || y < b.length;) {
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
}
return res;

/*
a: ZZYFGW
b: ZZYGST

m: ZYFGWC
r: ZZYFGW

*/