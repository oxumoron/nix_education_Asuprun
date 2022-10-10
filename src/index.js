export class Calculator {

    calculation(num1, num2, op){
  
      switch (op) {
  
        case 'sum':
          return num1 + num2;
  
        case 'minus':
          return num1 - num2;
  
        case 'multiple':
          return num1 * num2;
  
        case 'division':
          return num1 / num2;
      }
    }
  }
  
