jQuery(function($) {
    var eMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'september', 'October', 'November', 'December'];
    var nMonth = ['Baisakh', 'Jestha', 'Ashar', 'Shrawan', 'Bhadra', 'Ashoj', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var Vesak = {

        init: function() {
            this.changeFormState('toNepali');
            this.bindEvents();
        },

        bindEvents: function() {
            $('#switcher-to-english').click(function() {
                Vesak.changeFormState('toEnglish');
            });
            $('#switcher-to-nepali').click(function() {
                Vesak.changeFormState('toNepali');
            });
            $('.switch-group > a').click(function (e) {
                e.preventDefault()
            })
            $('button')
                .click(function(e) {
                    e.preventDefault()
                })
                .mouseup(function() {
                    $(this).blur()
                })


            $('#to-nepali-button').click(function() {
                Vesak.convert('toNepali');
            })
            $('#to-english-button').click(function() {
                Vesak.convert('toEnglish');
            });
        },

        changeFormState: function(method) {
            if (method == 'toEnglish') {
                $('#english-form').show();
                $('#nepali-form').hide();
                $('#switcher-to-english').addClass('active');
                $('#switcher-to-nepali').removeClass('active');

            } else {
                $('#nepali-form').show();
                $('#english-form').hide();
                $('#switcher-to-english').removeClass('active');
                $('#switcher-to-nepali').addClass('active');
            }
            $("#content").html('') // Empty content
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
            template = `Result: <span class="label-date">${days[+ dateResult.getDay() - 1]}, ${dateResult.getDate()} of ${monthName[pos]}, ${dateResult.getYear()}  </span>`
            $("#content").html(template)
            console.log(template);
        },

        getVesakDate: function(arg) {
            var state;

            arg == 'toNepali' ? state = 'english' : state = 'nepali';
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