class CalcController {

        constructor(){
            this._operation = []
            this._locale = 'pt-BR'
            this.displayCalc = document.querySelector("#display")
            this._dateEl = document.querySelector("#data")
            this._timeEl = document.querySelector("#hora")
            this._currentDate; 
            this.iniatialize()
            this.initButtonsEvents()
        }

        iniatialize(){

            setInterval(() => {
                this.setDisplayDateTime()
                

            }, 1000)
        }

        addEventListenerAll(element ,events, fn){
            events.split(' ').forEach(event => {
                element.addEventListener(event, fn, false)
            })
        }

        getLastOperation(){
            return this._operation[this._operation.length-1] //Pegando ultima posição do array 
              
        }

        isOperator(value){
            
            return (['+','-','*','%','/'].indexOf(value) > -1) //indexOf vai buscar o valor de value dentro do meu array 
            
        }

        setLastOperation(value){

            this._operation[this._operation.length-1] = value;
    
        }
        clearAll(){
            this._operation = []
        }

        clearEntry(){
            this._operation.pop()
        }

        addOperation(value){ 
            
            if (isNaN(this.getLastOperation())) {   //isNan é qualquer coisa que não seja um numero, Nan: true - notNan: false
                
                if (this.isOperator(value)) {

                    this.setLastOperation(value) //Meu array vazio ira receber o ultimo valor do meu value quando não for um numero

                } else if (isNaN(value)){

                    console.log('aaaaaaaa',value);
                
                } else {

                    this._operation.push(value);
    
                }

            } else {  //Se a caso for um numero irei tratar nesse else 
              
            let newValue = this.getLastOperation().toString() + value.toString()

            this.setLastOperation(parseInt(newValue)) //Populando o meu array
            }
            
            console.log(this._operation);
        }

        setError(){
            this.displayCalc = 'ERR0R'
        }

        execBtn(value){
            switch(value){
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
           let buttons = document.querySelectorAll("#buttons > g, #parts > g")
           buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-","");

                this.execBtn(textBtn);

            })
           this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
            btn.style.cursor = "pointer"
           })

        })}

        setDisplayDateTime(){
            this.displayDate = this.currentDate.toLocaleDateString(this._locale)
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
        }

        get displayTime(){
            return this._timeEl.innerHTML;
        }

        set displayTime(value){
            this._timeEl.innerHTML = value
        }

        get displayDate(){
            return this._dateEl.innerHTML;
        }

        set displayDate(value){
            this._dateEl.innerHTML = value
        }

        get displayCalc(){
            return this._displayCalcEl.innerHTML;
        }

        set displayCalc(value){
            this._displayCalc = value;
        }

        get currentDate(){
            return new Date()
        }

        set currentDate(data){
            this._dataAtual = data
        }
    }
