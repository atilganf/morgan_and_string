function recursiveEqualFunc(rslt, a, b, x, y, old) {
   if (a.charCodeAt(x + 1) && b.charCodeAt(y + 1)) {
      if (a.charCodeAt(x + 1) < b.charCodeAt(y + 1)) {
         rslt += old;
         rslt += a.charAt(x);
         x++;
         y -= old.length;
      } else if (a.charCodeAt(x + 1) > b.charCodeAt(y + 1)) {
         rslt += old;
         rslt += b.charAt(y);
         y++;
         x -= old.length;
         //a[x+1] === b[y+1]
      } else if (a.charCodeAt(x) < a.charCodeAt(x + 1)) {
         rslt += old + old;
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
            rslt += old + old;
            rslt += a.slice(x, tempX + 1) + b.slice(y, tempY + 1);
            x = tempX + 1;
            y = tempY + 1;
         } else {
            if (apDiffbp === 0) {
               old += a.slice(x, tempX + 1);
               return recursiveEqualFunc(rslt, a, b, tempX + 1, tempY + 1, old);
            } else if (apDiffbp > 0) {
               rslt += old;
               rslt += b.slice(y, tempY + 1);
               y = tempY + 1;
               x -= old.length;
            } else {
               rslt += old;
               rslt += a.slice(x, tempX + 1);
               x = tempX + 1;
               y -= old.length;
            }
         }
      }
   }
   else {
      rslt += old + old;
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

function morganAndString(a, b) {
   let res = "";
   let working = true;
   for (let x = 0, y = 0, i = 0; x < a.length || y < b.length;) {
      if (x < a.length && y < b.length) {
         if (a.charCodeAt(x) < b.charCodeAt(y)) {
            res += a.charAt(x)
            x++;
         } else if (a.charCodeAt(x) > b.charCodeAt(y)) {
            res += b.charAt(y)
            y++;
         } else if (a.charCodeAt(x) === b.charCodeAt(y)) {
            let req = recursiveEqualFunc("", a, b, x, y, "", 0);
            res += req.rslt;
            x = req.x;
            y = req.y;

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
}

