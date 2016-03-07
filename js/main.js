jQuery(function($) {
    var englishMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'september', 'October', 'November', 'December'];
    var nepaliMonth = ['Baisakh', 'Jestha', 'Ashar', 'Shrawan', 'Bhadra', 'Ashoj', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
    var Vesak = {

        init: function() {

            var $convertButton = $('#convert-button');;
            var $englishSwitch = $('#english-switch');
            var $nepaliSwitch = $('#nepali-switch');

            var $englishForm = $('#english-conversion-form');
            var $nepaliForm = $('#nepali-conversion-form');

            var $switchers = $("#switch-dates input[type='radio']:checked");
            var $convertedDate = $('#converted-date');




            if (Vesak.getCalenderType == "nepali") {
                $nepaliForm.removeClass('hidden')
            } else {
                $englishForm.removeClass('hidden')
            }

            $nepaliSwitch.on('click', function() {
                $(this).attr("checked", "");
                $englishSwitch.removeAttr("checked");


            });
            $englishSwitch.on('click', function() {
                $(this).attr("checked", "");
                $nepaliSwitch.removeAttr("checked")

            });

            $convertButton.on('click', function() {
                Vesak.convertDate(Vesak.getCalenderType())
            });

            $('#switch-dates').on('change', function() {
                if (Vesak.getCalenderType() == 'nepali') {
                    $nepaliForm.removeClass('hidden')
                    $englishForm.addClass('hidden')
                    $convertButton.html('Convert To English')
                } else {
                    $englishForm.removeClass('hidden')
                    $nepaliForm.addClass('hidden')
                    $convertButton.html('Convert To Nepali')
                }
                $('#converted-date').addClass('invisible')


            });




        },

        convertDate: function(ctype) {

            var crunch;
            var fromDate = Vesak.getVesakDate(ctype)

            if (ctype == "nepali") {
                crunch = neptoeng.DateConversion(fromDate.eDay, fromDate.eMonth, fromDate.eYear);
            } else if (ctype == "english") {
                crunch = engtonep.DateConversion(fromDate.eDay, fromDate.eMonth, fromDate.eYear);
            }


            const template = `${crunch.getYear()}, ${Vesak.addSuffix(crunch.getDate())} of ${nepaliMonth[parseInt(crunch.getMonth()) - 1]}`
            const templateDMY = ` (${crunch.getYear()}/${crunch.getMonth()}/${crunch.getDate()})`
            $('#converted-date')
                .removeClass('invisible')
                .empty()
                .append('Your converted date is: ')
                .append(template)
                .append(templateDMY)


        },

        getCalenderType: function() {
            return $("#switch-dates input[type='radio']:checked").val();

        },

        addSuffix: function(theDate) {
            var stamp;
            if ((theDate >= 11) && (theDate <= 13)) {
                stamp = 'th';

            } else {
                var endsWith = theDate % 10,
                    stamp = ((theDate % 100 / 10) === 1) ? 'th' : (endsWith === 1) ? 'st' : (endsWith === 2) ? 'nd' : (endsWith === 3) ? 'rd' : 'th';

            }
            return theDate + stamp
        },

        getVesakDate: function(calenderType) {

            if (calenderType == "english") {

                return {
                    eYear: parseInt($('#english-date-selector option:selected').val()),
                    eMonth: parseInt($('#english-month-selector option:selected').val()),
                    eDay: parseInt($('#english-day-selector option:selected').val())

                }
            } else if (calenderType == "nepali") {
                return {
                    eYear: parseInt($('#nepali-date-selector option:selected').val()),
                    eMonth: parseInt($('#nepali-month-selector option:selected').val()),
                    eDay: parseInt($('#nepali-day-selector option:selected').val())

                }
            }
        }
    }
    Vesak.init()


    //console.log(ajako.toEnglish(08, 10, 2072))
});