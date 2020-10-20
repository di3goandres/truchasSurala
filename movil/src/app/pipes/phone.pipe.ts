import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(rawNum) {
 

     rawNum = rawNum.charAt(0) != 0 ? "" + rawNum : "" + rawNum;

    let newStr = "";
    let i = 0;

    //3203025916
    if(rawNum.length==10){
      newStr = newStr + rawNum.substr(0, 3) + "-";
      newStr = newStr + rawNum.substr(3, 3) + "-";
      newStr = newStr + rawNum.substr(6, 2) + "-";
      newStr = newStr + rawNum.substr(8, 2) 

      

    }else{
      newStr = rawNum;
    }
  

    return newStr;
  }

}
