class CalcController {

    constructor(){
        this.lastOperator = ''
        this.lastNumber = ''
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();

    }

    initialize(){

        
        this.setDisplayDateTime()
        
        setInterval(()=>{
            
            this.setDisplayDateTime();
            
        }, 1000); //Iniciando o meu relogio, contando de 1 em 1 segundo
        
        this.setLastNumberToDisplay()
    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        })
    
    } //TODO

    clearAll(){
        
        this._operation = [];
        
        this.setLastNumberToDisplay()

    } //função atribuida para limpar o meu array de operação 

    clearEntry(){

        this._operation.pop();

        this.setLastNumberToDisplay()

    } //função atribuida para limpar a ultima entrada do meu array de operação

    getLastOperation(){

        return this._operation[this._operation.length-1];

    } //obtendo a ultima posição do meu array

    setLastOperation(value){

        this._operation[this._operation.length-1] = value;

    } //recebendo a ultima value na ultima posição do meu array

    isOperator(value){

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    } //TODO

    pushOperation(value){

        this._operation.push(value); //Recebe meu value dentro do array

        if (this._operation.length > 3) { //verifica se tem menos de 3 operação dentro do meu array

            this.calc(); // menos de 3 operação = metodo calc 

        }

    }

    getResult(){
        
        return eval(this._operation.join("")) //junta tudo em uma string

    }

    calc(){

        let last = '';

        if(this._operation.length > 3){
            last = this._operation.pop(); //guarda a ultima posição do meu array
            

            let _lastNumber = this.getResult() 
        }

        let result = this.getResult(); //junta tudo em uma string

        if('%' == last){

            result = result / 100 

            this._operation = [result]

        } else {
            
            this._operation = [result] //guarda result no meu array

            if(last) this._operation.push(last)

        }
         

        

        this.setLastNumberToDisplay(); //executa metodo abaixo 

    }

    getLastItem(isOperator = true){
        
        let lastItem; 

        for (let i = this._operation.length-1; i >= 0; i--){

            if (isOperator) {

            if(this.isOperator(this._operation[i])){
                lastItem = this._operation[i];

                break;
            }
            
        
            } else {
                
            if(!this.isOperator(this._operation[i])){
                lastItem = this._operation[i];

                    break;
                }
            }

        }

        return lastItem
    }

    setLastNumberToDisplay(){

        let lastNumber; 

        for (let i = this._operation.length-1; i >= 0; i--){

            if (!this.isOperator(this._operation[i])) {

                lastNumber = this._operation[i];

                break;

            }

        }

        if(!lastNumber) lastNumber = 0; //Se lastNumber for vazio = 0

        this.displayCalc = lastNumber; // displayCalc ira exibir meu ultimo numero na tela

    }

    addOperation(value){


        if (isNaN(this.getLastOperation())) { //Se a ultima operação não for um numero 

            if (this.isOperator(value)) {

                this.setLastOperation(value); //seta ela

                console.log('caiu aqui');

            } else if (isNaN(value)){ //entender melhor esse else if

                console.log("outra coisa",value);

            } else { // Se for um numero 

                this.pushOperation(value) //executa função metodo recebendo meu numero

                this.setLastNumberToDisplay();

            }

        } else { //MAIS

            if (this.isOperator(value)){  //SE for um operador 

                this.pushOperation(value); //executa metodo push operador 

            } else {

                let newValue = this.getLastOperation().toString() + value.toString(); //salva valores em uma variavel e transforma em string

                this.setLastOperation(parseInt(newValue)); //transforma em int a ultima operação 

                this.setLastNumberToDisplay(); //exibe na tela

            }

        }

    }

    setError(){

        this.displayCalc = "Error";
        
    }

    execBtn(value){

        switch (value) {

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }

    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, "click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-","");

                this.execBtn(textBtn);

            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer";

            })

        })

    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime(){

        return this._timeEl.innerHTML;

    }

    set displayTime(value){

        return this._timeEl.innerHTML = value;

    }

    get displayDate(){

        return this._dateEl.innerHTML;

    }

    set displayDate(value){

        return this._dateEl.innerHTML = value;

    }

    get displayCalc(){

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value){

        this._displayCalcEl.innerHTML = value;

    }

    get currentDate(){

        return new Date();

    }

    set currentDate(value){

        this._currentDate = value;

    }

}