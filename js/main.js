jQuery(function($) {
    var eMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'september', 'October', 'November', 'December'];
    var nMonth = ['Baisakh', 'Jestha', 'Ashar', 'Shrawan', 'Bhadra', 'Ashoj', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
    var Vesak = {

        init: function() {
            this.changeFormState();
            this.bindEvents();
        },

        bindEvents: function() {
            $('#switcher-to-english').change(function() {
                Vesak.changeFormState();
            });
            $('button').click(function(e) {
                e.preventDefault()
            })
            $('#to-nepali-button').click(function() {
                Vesak.convert('toNepali');
            })
            $('#to-english-button').click(function() {
                Vesak.convert('toEnglish');
            });
        },

        changeFormState: function() {
            if ($('#switcher-to-english').is(':checked')) {
                $('#english-form').show();
                $('#nepali-form').hide();
            } else {
                $('#nepali-form').show();
                $('#english-form').hide();
            }
        },

        convert: function(ctype) {

            var dateResult;
            var template;
            var monthName;
            var pos; // `Dateconversion()` returns month starting from 1 adjust this
            var getDate = this.getVesakDate(ctype); // TODO: Get an actual date

            if (ctype == 'toEnglish') {
                dateResult = neptoeng.DateConversion(getDate.day, getDate.month, getDate.year);
                monthName = eMonth;
                console.log('Converting to english Date')
            } else if (ctype == 'toNepali') {
                dateResult = engtonep.DateConversion(getDate.day, getDate.month, getDate.year);
                monthName = nMonth;
                console.log('Converting to nepali Date')

            } else {
                console.warn('No arguments provided for date conversion');
            }

            pos = +dateResult.getMonth() - 1;
            template = `The date is ${dateResult.getDate()}th of ${monthName[pos]}, ${dateResult.getYear()}`
            $("#content").html(template)
            console.log(template);
        },

        getVesakDate: function(d) {
            var state;

            d == 'toNepali' ? state = 'english' : state = 'nepali';
            console.log('state:' + state);
            return {
                year: +$('#' + state + '-form > .year-selector option:selected').val(),
                month: +$('#' + state + '-form > .month-selector option:selected').val(),
                day: +$('#' + state + '-form > .day-selector option:selected').val()

            }
        }


    }
    Vesak.init();
});