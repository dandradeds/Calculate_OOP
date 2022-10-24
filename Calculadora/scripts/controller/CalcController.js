class CalcController {

        constructor(){
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

        initButtonsEvents(){
           let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        buttons.forEach((btn, index) => {
           btn.addEventListener('click', e => {
            console.log(btn);
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